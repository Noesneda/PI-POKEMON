import axios from 'axios';
//EXPORTO LAS VARIABLES DE LAS ACTIONS
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const FILTER_BY_EXISTENT = 'FILTER_BY_EXISTENT';
export const ORDER_BY_ASC_DESC = 'ORDER_BY_ASC_DESC';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS';
export const POST_POKEMONS = 'POST_POKEMONS';
export const GET_DETAIL = 'GET_DETAIL';
export const SET_STATES = 'SET_STATES';
export const DELETE_POKEMON = 'DELETE_POKEMON';



export const getPokemons = () => {
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data,            
        })
    }
};

export const getTypes = () => {
    return async function (dispatch){
        let jsonType = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: GET_TYPES,
            payload: jsonType.data,
        })
    }
};

export const filterByTypes = (payload)=> {
    try {
        return{
            type: FILTER_BY_TYPES,
            payload,
        }        
    } catch (error) {
        return alert('Error: fail filter');       
    }
};

export const filterByCreated = (payload)=> {
    try {
        return{
            type: FILTER_BY_CREATED,
            payload,
        }
    } catch (error) {
        return alert ('Error: pokemon is not created');        
    }
}

export const filterByExistent = (payload)=>{
    try {
        return{
            type:FILTER_BY_EXISTENT,
            payload,
        }        
    } catch (error) {
        return alert ('Error: pokemon does not exist, sorry ')        
    }
};

export const orderByAscDesc = (payload) =>{
    return{
        type: ORDER_BY_ASC_DESC,
        payload,
    }
};
export const orderByAttack = (payload) =>{
    return{
        type: ORDER_BY_ATTACK,
        payload,
    }
};
export const getNamePokemons = (name) => {
    return async function (dispatch){
        try {
            let jsonName = await axios.get("http://localhost:3001/pokemons?name=" + name);            
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: jsonName.data,
            })            
        } catch (error) {
            return alert ('Error: Name does not validated')            
        }
    }
};
export const postPokemons = (payload) => {
    return async function (){
        console.log(payload);
        const jsonPost = await axios.post('http://localhost:3001/pokemons', payload);
        console.log(jsonPost);
        return jsonPost.data
    };
};

export const getDetail = (id)=> {    
    return async function (dispatch){
        try{
        let jsonId = await axios.get ('http://localhost:3001/pokemons/' + id);
        return dispatch({
            type: GET_DETAIL,
            payload: jsonId.data
        })
    }catch(error){
        return alert (error);
    }
  }
};

export const setStates = ()=>{
    return{
    type: SET_STATES   
 }
};

export const dbPokeDelete = (id)=>{
    return async function (dispatch){
        try {
            let jsonDel = await axios.delete ('http://localhost:3001/pokemons/' + id);
            console.log(id);
            return dispatch({
                type: DELETE_POKEMON,
                payload: jsonDel.data
            })      
        } catch (error) {
            return alert (error);            
        }
    }
}




