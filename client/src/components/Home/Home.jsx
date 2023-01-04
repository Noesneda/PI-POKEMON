import React, { useState, useEffect } from "react";
//IMPORTO LOS HOOKS
import {useDispatch, useSelector} from 'react-redux';
//IMPORTO LAS FUNCIONES DE LAS ACTIONS
import 
{ filterByTypes,
 getPokemons,
 getTypes, 
 filterByCreated, 
 filterByExistent, 
 orderByAscDesc, 
 orderByAttack,
} from '../../actions/actions';
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';
import Assets from '../../Assets/landing3.webp'




const Home = () => {
    const dispatch = useDispatch();    
    const allPokemons = useSelector ((state) => state.pokemons);//Declaro una constante y me traigo todo lo que esta en el estado de pokemons
    const types = useSelector((state)=>state.types);
    
    const [,setOrder] = useState ('')

   //paginado
    const [currentPage, setCurrentPage] = useState(1); //Creo una const donde seteo la pag actual, la guardo en el estado y empieza en 1
    const [pokemonsPerPage,] = useState(12); //creo otra const donde guardo los personajes que quiero por pagina (12)
    const indexOffLastPokemon = currentPage * pokemonsPerPage; //
    const indexOffFirstPokemon = indexOffLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOffFirstPokemon, indexOffLastPokemon);
                                                  //desde                 hasta
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


useEffect(()=>{
    dispatch(getTypes());    
    dispatch(getPokemons());
    setCurrentPage(1);        
},[dispatch]);


//e=evento
function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons());    
};

function handleFilterByTypes (e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByTypes(e.target.value));
};
// console.log(types);
function handleFilterCreated(e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByCreated());
};
function handleFilterByExistent(e){
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByExistent())
};
//Ordenamiento: despacho la accion luego seteo mi pagina en 1 y por ultimo me creo un estado pars que me ordene
function handleOrderByAscDesc(e){
    e.preventDefault();
    dispatch(orderByAscDesc(e.target.value))
    setCurrentPage(1);
    setOrder(`Orden ${e.target.value}`)
};
function handleOrderByAttack(e){
    e.preventDefault();
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrder(`Orden ${e.target.value}`)
}

return(
    <div className="container-Home">

        <div className="div1">
        <Link to = '/pokemons' className= 'select' >
            <div >
                <button id="lalaOp">
                   CREATE POKEMON
               </button>
            </div>
        </Link>     
        
        <button id="lalaOp" onClick={(e)=> handleClick(e)}>
            CHARGE ALL POKEMONS            
        </button>
        </div>
        
        <div className="div">
            <select id="lalaOptions"onChange={(e)=>handleOrderByAscDesc(e)}>
                           
                <option  value="asc">Ascendent</option>
                <option  value="des">Descendent</option>               
            </select>

            <select id="lalaOptions"onChange={(e)=>handleOrderByAttack(e)}>             
                <option value='attackAsc'>Attack +</option>
                <option  value="attackDesc">Attack -</option>
            </select>

            <select  id="lalaOptions" onChange={(e)=>handleFilterByTypes(e)}>
                <option value='type'>All Types</option>
                {types?.sort().map((type)=>(
                    <option value={type}>{type}</option>
                ))}                
            </select>     

            <button id="lalaOptions"  onClick={(e)=>handleFilterByExistent(e)}>
                Existent
            </button>

            <button id="lalaOptions" onClick={(e)=>handleFilterCreated(e)}>
                Created
            </button>

            
            <SearchBar
            setCurrentPage={setCurrentPage}
            />
            

            <div className="paginado">            
            <Paginated
            pokemonsPerPage={pokemonsPerPage}
            allPokemons = {allPokemons.length}
            paginado = {paginado}
            />
            </div>

            <div className="cardgame">
            {currentPokemons?.map( (e) => { 
                return(
                    <div > 
                        <Card name= {e.name} types= {e.types} image= {e.image} id= {e.id}/>                       
                    </div> 
                  
                )              
                
            })} 
            </div>
                                
        </div>
        :   <p><img src={Assets} alt="loading..." width='100px'/></p>
        
    </div>
    
)
}

export default Home;