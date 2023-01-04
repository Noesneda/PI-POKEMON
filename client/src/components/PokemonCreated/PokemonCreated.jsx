import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { postPokemons, getTypes, getPokemons } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validateForm';
import './PokemonCreated.css';

const PokemonCreated = () =>{
    const dispatch = useDispatch();   
    const types = useSelector((state)=>state.types);
    const allPokemons = useSelector((state) => state.pokemons);

    const [errors, setError] = useState({});
    const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        createDb: true,             
        types:[],
    })

    useEffect(()=>{
        dispatch(getTypes());
        dispatch(getPokemons());
    },[dispatch])
    
    //Funcion con la que a mi estado input admas d lo que ya tiene le agrego el target.name que le pase en los botones
    const handleChange=(e)=>{
        const {name, value} = e.target //Refactorizo e.target.value y e.target.name
        setInput({
            ...input,
            [name] : value,
        })
        setError(validate({
           ...input,
           [name]: value 
          })); 
          console.log(input);         
    };

    const handleTypes = (e) => {
        const valueType = e.target.value       
        setInput({
            ...input,
            types:[...new Set([...input.types, valueType])]
        });
        setError(validate({
          ...input,
          [e.target.name]: valueType }));
         console.log(input);
    };
    const handleDeleteType = (type) => { 
        setInput({
          ...input,
          types: input.types.filter(ty => ty !== type)
        });
      };

    const handleNumber = (e)=> {
        const {name, value} = e.target        
        const number = parseInt(value);
        setInput({
            ...input,
            [name] : number
        })
        setError(validate({
           ...input,
           [name]: value 
          }));
    };

    const handleSubmit = (e) => {      
        e.preventDefault();
        try {
          let findName = allPokemons.filter((e) => e.name.toLowerCase() === (input.name.toLowerCase()));           
            if (!findName) {
              return alert("UPS! Pokemon already exists. Create another!!");
              }              
              else if (findName){
                const newPokemon = {
                  name: input.name,
                  life: input.life,
                  attack: input.attack,
                  defense: input.defense,
                  speed: input.speed,
                  height: input.height,
                  weight: input.weight,
                  types: input.types,
                  image: input.image,               
                  createDb: true,
                };
                
                dispatch(postPokemons(newPokemon));
              }        
              setInput({
                name: "",
                life: "",
                attack: "",
                defense: "",
                speed: "",
                height: "",
                weight: "",
                createDb: true,            
                types:[],
              })
              alert(`Pokemon created successfully!!`);
              
            } catch (error) {              
              return alert(
                'UPS! Something failed. Try again!'
              );
            };
                               
          };

    return(
        <div className='containForm'>
            <Link to='/home'><button id= 'lalaFormX'>Back To Home</button></Link>
            <h1 className='title'>CREATE YOUR POKEMON</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label id= 'lalaForm'>Name:</label>
                <input
                className="inputForm"
                key= 'name'
                type="text"
                value={input.name}
                name= 'name'
                onChange={handleChange}
                />
                {errors.name && (
                <div className="errors">
                  <div id="name">{errors.name}</div>
                </div>
              )}
            </div>            
            <div>
                <label id= 'lalaForm' >Life:</label>
                <input
                className="inputForm"
                key= 'life'
                type="number"
                value={input.life}
                name= 'life'
                min= '1'
                onChange={handleNumber}
                />
                {errors.life && (
                <div className="errors">
                  <div>{errors.life}</div>
                </div>
              )}
            </div>
            <div>
                <label id= 'lalaForm'>Attack:</label>
                <input
                className="inputForm"
                key= 'attack'
                type="number"
                value={input.attack}
                name= 'attack'
                min= '1'
                onChange={handleNumber}
                />
                {errors.attack && (
                <div className="errors">
                  <div>{errors.attack}</div>
                </div>
              )}
            </div>
            <div>
                <label id= 'lalaForm'>Defense:</label>
                <input
                className="inputForm"
                key= 'defense'
                type="number"
                value={input.defense}
                name= 'defense'
                min= '1'
                onChange={handleNumber}
                />
                {errors.defense && (
                <div className="errors">
                  <div>{errors.defense}</div>
                </div>
              )}
            </div>
            <div>
                <label id= 'lalaForm'>Speed:</label>
                <input
                className="inputForm"
                key= 'speed'
                type="number"
                value={input.speed}
                name= 'speed'
                min= '1'
                onChange={handleNumber}
                />
                {errors.speed && (
                <div className="errors">
                  <div>{errors.speed}</div>
                </div>
              )}
            </div>
            <div>
                <label id= 'lalaForm'>Height:</label>
                <input
                className="inputForm"
                key= 'height'
                type="number"
                value={input.height}
                name= 'height'
                min= '1'
                onChange={handleNumber}
                />
                {errors.height && (
                <div className="errors">
                  <div>{errors.height}</div>
                </div>
              )}
            </div>
            <div>
                <label id= 'lalaForm'>Weight:</label>
                <input
                className="inputForm"
                key= 'weight'
                type="number"
                value={input.weight}
                name= 'weight'
                min= '1'
                onChange={handleNumber}
                />
                {errors.weight && (
                <div className="errors">
                  <div>{errors.weight}</div>
                </div>
              )}
            </div>            
            <div>
            <label id= 'lalaForm'>Image: </label>
                 <input
                    className="inputForm"
                    onChange={(e)=>handleChange(e)}
                    value={input.image}
                    name="image"
                    type="url"
                    placeholder="Put the url of image..."
                 />              
              {errors.image && (
                <div className="errors">
                  <div>{errors.image}</div>
                </div>
              )}
              </div>
            <label  id= 'lalaFormT' >Types: </label>
            <select  id= 'lalaFormX'  onChange={(e)=>handleTypes(e)}>                  
            {types.map((type)=>(
                <option key ={type} value={type}>
                  {type}
                </option>
            ))}
            </select>
            {errors.types && (
                <div className="errors">
                  <div>{errors.types}</div>
                </div>
              )} 
            <div>
            <button id= 'lalaFormX' type='submit' disabled= {!input.name}>Create Pokemon</button>
            </div>                     
        </form>
        {input.types.map(ty =>
            <div id= 'lalaFormX'>
                <p id= 'lalaFormX'>{ty}</p>
                <button id= 'lalaFormX' onClick={()=>handleDeleteType(ty)}>X</button>
            </div>
        )}  
       
        </div>
    )




};

export default PokemonCreated;