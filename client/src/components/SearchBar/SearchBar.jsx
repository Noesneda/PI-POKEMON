import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons, setStates } from "../../actions/actions";
import './SearchBar.css';

const SearchBar = ({setCurrentPage}) => {
    const dispatch = useDispatch()
    const[name, setName] = useState (" ")
   
   
    const handleInput=(e)=>{
        e.preventDefault();
        setName(e.target.value);                   
        console.log(name);
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await dispatch(setStates());
        await dispatch(getNamePokemons(name));
        await setName("");                         
        setCurrentPage(1);
    };

    return(
        <div className="contenedor-search">
            <input
            className="input"
            type='text'            
            placeholder='Search...'            
            onChange={(e)=>handleInput(e)}            
            />
            <button id="lalaS" type ='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )


};

export default SearchBar;