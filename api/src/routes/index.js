const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Pokemon, Type} = require ('../db');
const db = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------------------------------------//
//CONTROLLERS//

//OBTENER LOS DATOS DE LOS POKEMON DESDE LA API
const getApiPoke = async ()=>{  
    const pokeApi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");    
    const urlApi = await pokeApi.data.results.map((info)=>{
        return axios.get(info.url)
    });     
    const promiseUrl = await Promise.all (urlApi);  
    const pokeData = promiseUrl.map((e)=>e.data);   
    //mapeo la info 
    const pokeDataFilter = pokeData.map((poke)=>{
        const pokemon = {
            id: poke.id,
            name: poke.name,
            life: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            speed: poke.stats[5].base_stat,
            height: poke.height,
            weight: poke.weight,
            image: poke.sprites.other.home.front_default,
            types: poke.types.map(t => t.type),
        };
     return pokemon;    
    });  
    return pokeDataFilter 
};

//INFO DE LA DB
const getDbPoke = async ()=> {
    const db = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    if(db.length) return db;
    return [];
};
//JUNTO LA INFO TRAIDA DE LA API Y LA DE DB
const getAllPoke = async ()=>{
    const apiPoke = await getApiPoke();
    const dbPoke = await getDbPoke();
    const allPoke = await apiPoke.concat(dbPoke);
    return allPoke;
};

//TRAIGO TODOS LOS TIPOS DE POKEMON DE LA API
const getTypes = async ()=>{
   const allTypes = await Type.findAll();
   if(!allTypes.length){
    const typeApi = await axios.get("https://pokeapi.co/api/v2/type/");
    //Mapeo la api para poder sacar solo el nombre del type de pokemon
    const tyPoke = await typeApi.data.results;
    const newType = tyPoke.map((ty) =>{
        let obj = {
            id: ty.id,
            name: ty.name
        }
        return obj;          
    });
    const type1 = await Type.bulkCreate(newType);
    const type2 = type1.map(ty=>ty.name);   
    return type2;
   }
   const type3 = allTypes.map(ty=>ty.name);    
   return type3;
    
}

//-----------------------------------------------------------//
//RUTAS//

//Obtener nombre exacto o todos los pokemons por query de API y/o DB
router.get("/pokemons", async (req,res)=>{
    try{
        const {name} = req.query
        let pokesAll = await getAllPoke();
            if (name){
                const pokeName = await pokesAll.filter(e => e.name.toLowerCase() === (name.toLowerCase()))
                pokeName.length ?
                res.status(200).json(pokeName) :
                res.status(404).json("Pokemon not found")}
            else res.status (200).json(pokesAll)           
    }catch (error){
            res.status(404).json({error:message})
    }
   
});

//TRAER TODOS LOS TYPOS DE POKES DESDE LA API A LA DB Y DE AHÍ EJECUTARLOS
router.get("/types", async (req,res)=>{   
    
    try {
        const types = await getTypes();//Me traigo mi funcion controller y la guardo en una constante         
        if (types.length === 0) throw Error ("Type is not found");     
        else return res.status(200).json(types);//devuelvo el status y el typo de pokemon creado dentro de json             
    } catch (error) {
        res.status(404).json(error.message);        
    };
});

router.post("/pokemons", async (req,res)=>{
    try {
        const{name, life, attack, defense, speed, height, weight, image, types, createDb}=req.body;
        console.log(height, weight);
        const [poke, created]= await Pokemon.findOrCreate({
            where: {name: name.toLowerCase()},
            defaults: {
                name: name.toLowerCase(),
                life: life, 
                attack: attack, 
                defense: defense, 
                speed: speed,
                height: height,
                weight: weight,
                image: image,
                createDb: createDb,               
            },
        });
        let addTypes = await Type.findAll({ where: { name: types} });
        await poke.addTypes(addTypes);
        const createdPoke = await getDbPoke();
        console.log(createdPoke);
        
        if(!created) res.status(404).json("UPS! Pokemon already exists. Create another!!");
        else return res.status(200).send(createdPoke);      
                
              
                
    } catch (error) {
        res.status(404).json("Pokemon not created");
    }
});
//ENCONTRAR POKEMON POR ID DE API Y DE DB
router.get("/pokemons/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const allPokes = await getAllPoke();
        if(id){
        const idPoke= await allPokes.filter(poke => poke.id == id);
        idPoke.length?
        res.status(200).json(idPoke):
        res.status(404).json("Pokemon not found");
        }       
    } catch (error) {
        res.status(404).json(message.error);        
    }
});

router.delete("/pokemons/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const dbPokemon = await getDbPoke();
        if (dbPokemon)
        await Pokemon.destroy({
            where:{
                id,
                createDb: true,
            }            
        })
        return res.status(200).json("Pokemon eliminated sussesfully")
        
    } catch (error) {
        res.status(400).json("Pokemon not eliminated, try again!")        
    }
})



module.exports = router;


//----------------------------------------------------------------------------//

