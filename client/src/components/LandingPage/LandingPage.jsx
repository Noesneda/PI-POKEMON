import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import Assets from '../../Assets/Landing pikachu 4.webp';

export default function LandingPage(){
    return(
        <div className="Landing-container">
            <Link to={'/home'}>              
              <button className="button">WELCOME TO POKEMON API</button>
              <img className= "img"src={Assets} alt="loading..." />              
            </Link>
        </div>
    )
}
