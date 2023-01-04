import React from "react";
import {Link} from 'react-router-dom';
import '../Card/Card.css';



const Card = ({name, types, image, id})=>{
    return(
        <div className="card-pokemon">
            <h2 className="poke-name">{name}</h2>
            <h5 className="poke-types">{types?.map((e) => "  " + e.name).join(", ")}</h5>            
            <Link to= {`/pokemons/${id}`}>
            <img src={image} alt="IMAGEN" className="poke-img"/>
            </Link>            
        </div>
    );
};

export default Card;