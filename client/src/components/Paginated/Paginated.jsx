import React from "react";
import './Paginated.css';


const Paginated =({pokemonsPerPage, allPokemons, paginado})=>{

    const pageNumbers = [];

    for (let i = 0; i <=Math.ceil(allPokemons/pokemonsPerPage)-1; i++){
        pageNumbers.push(i+1)
    };


    return(
        
            <nav>
                <ul className="pagination">
                    {pageNumbers?.map(number=>{
                        return(
                        <li key={number}>
                        <button id="lala" onClick={()=> paginado(number)}>{number}</button>
                        </li>
                    )})}
                </ul>
            </nav>
        
    );
};

export default Paginated;