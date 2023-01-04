import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { getDetail, setStates, dbPokeDelete } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Assets from '../../Assets/Pika_corriendo_gif.webp'
import './Details.css';


const Details = (props)=>{
    console.log(props);
    const dispatch = useDispatch();   
    const pokemonDetails = useSelector((state)=>state.details);    
    // console.log(pokemonDetails);
    
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
        dispatch(setStates())
    },[dispatch, props.match.params.id])


    const handleDeletePokemon = (e) => {
        e.preventDefault();
        dispatch(dbPokeDelete(props.match.params.id))
        alert ('Pokemon eliminated succesfully')
        window.location.replace('/home')        
      };

      let boleano = pokemonDetails.map( e=> e.createDb)      
    //   console.log(boleano[0]);

      if(boleano[0]=== true){
    return (
        
        <div className='containerDiv'>
            <Link to = '/home'>
                <div>
                   <button id="lalaOp3">
                      Go Back
                   </button>
                </div>
            </Link>
            
            {
                pokemonDetails.length > 0 ?
                <div className='detail-content'>                    
                    <img className= 'poke-imgen'src={pokemonDetails[0].image} alt="i" width="300 px" height= "400px"/>
                    <h1 className='poke-names'>I am {pokemonDetails[0].name}</h1>
                    <div className='details'>
                    <h3>Types: {pokemonDetails[0].types.map(ty =>ty.name + (' '))}</h3>
                    <h3>Id: {pokemonDetails[0].id}</h3>
                    <h3>Life: {pokemonDetails[0].life}</h3>
                    <h3>Attack: {pokemonDetails[0].attack}</h3>
                    <h3>Defense: {pokemonDetails[0].defense}</h3>
                    <h3>Speed: {pokemonDetails[0].speed}</h3>
                    <h3>Height: {pokemonDetails[0].height}</h3>
                    <h3>Weight: {pokemonDetails[0].weight}</h3>                 
                    <button
                    id="lalaOp4"
                    onClick={(e)=>handleDeletePokemon(e)}>
                        DELETE
                    </button>               
                            

                    </div>
                </div> : <p><img src={Assets} alt="loading..." width='100px'/></p>
            }
        </div>
    )
 } 
 else {
    return (
        <div className='containerDiv'>
            <Link to = '/home'>
                <div>
                   <button id="lalaOp3">
                      Go Back
                   </button>
                </div>
            </Link>
            
            {
                pokemonDetails.length > 0 ?
                <div className='detail-content'>                    
                    <img className= 'poke-imgen'src={pokemonDetails[0].image} alt="i" width="300 px" height= "400px"/>
                    <h1 className='poke-names'>I am {pokemonDetails[0].name}</h1>
                    <div className='details'>
                    <h3>Types: {pokemonDetails[0].types.map(ty =>ty.name + (' '))}</h3>
                    <h3>Id: {pokemonDetails[0].id}</h3>
                    <h3>Life: {pokemonDetails[0].life}</h3>
                    <h3>Attack: {pokemonDetails[0].attack}</h3>
                    <h3>Defense: {pokemonDetails[0].defense}</h3>
                    <h3>Speed: {pokemonDetails[0].speed}</h3>
                    <h3>Height: {pokemonDetails[0].height}</h3>
                    <h3>Weight: {pokemonDetails[0].weight}</h3>               

                </div>
                </div> : <p><img src={Assets} alt="loading..." width='100px'/></p>
            }
        </div>
    )    
 }

 
}

export default Details;