import 
{GET_POKEMONS,
 GET_TYPES, 
 FILTER_BY_TYPES,
 FILTER_BY_CREATED, 
 FILTER_BY_EXISTENT,
 ORDER_BY_ASC_DESC,
 ORDER_BY_ATTACK,
 GET_NAME_POKEMONS,
 POST_POKEMONS,
 GET_DETAIL,
 SET_STATES,
 DELETE_POKEMON,
} from '../actions/actions';

const initialState = {
    pokemons: [],
    allPokemons: [], //estado con copia de los pokemons 
    types: [],
    details: [],
    
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_POKEMONS:
            return{
                ...state,
                pokemons:action.payload,
                allPokemons: action.payload,                
                                               
            };
        case GET_TYPES:           
            return{
                ...state,
                types: action.payload,
            };
        case FILTER_BY_TYPES:
            let filtered = state.allPokemons;
            let filterByTypes = filtered.filter((poke)=>poke.types.map((ty)=>ty.name).includes(action.payload)
            || poke.types.includes(action.payload));
            if(action.payload === 'type')filterByTypes = filtered;
            console.log(filterByTypes);
            return{
                ...state,
                pokemons: filterByTypes,
            };
        case FILTER_BY_CREATED:
            let copiState = state.allPokemons;
            let createdFilter = copiState.filter((poke)=>poke.createDb === true);            
            console.log(createdFilter);
            return{
                ...state,
                pokemons: createdFilter,
            };
        case FILTER_BY_EXISTENT:
            let copiState1 = state.allPokemons;
            let existentFilter = copiState1.filter((poke)=>!poke.createDb);            
            console.log(existentFilter);
            return{
                ...state,
                pokemons: existentFilter,
            };
        case ORDER_BY_ASC_DESC:
            let sortOrder = action.payload === 'asc' ?
            state.pokemons.sort(function(a,b){
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            });
            return{
                ...state,
                pokemons: sortOrder,                
            };
        case ORDER_BY_ATTACK:
            let sortAttack = action.payload === 'attackAsc' ?                 
            state.pokemons.sort(function(a,b){
                if(a.attack > b.attack){
                    return -1;
                }
                if(b.attack > a.attack){
                    return 1;
                }
                    return 0;
                }) :
            state.pokemons.sort(function(a,b){
                if (a.attack > b.attack){
                    return 1;
                }
                if (b.attack > a.attack){
                    return -1;
                }
                return 0;
                })
            return{
                ...state,
                pokemons: sortAttack,                
            };
        case GET_NAME_POKEMONS:                  
            return{
                ...state,
                pokemons: action.payload,
            };
        case POST_POKEMONS:
            return{
                ...state
            };               
        case GET_DETAIL:
            return{
                ...state,
                details: action.payload
            };
        case SET_STATES:
            return{
                ...state,
                details: [],
            }
        case DELETE_POKEMON:
             return{
                ...state,                
            }            
        default:
            return state;
    };
};

export default rootReducer;