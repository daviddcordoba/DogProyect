import { CREATE_DOG, FILTER_BY_ORDER, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, FILTER_BY_WEIGTH, GET_DOGS, GET_DOG_BY_RAZA, GET_TEMPERAMENTS } from "./actions";

let initialState = {
    allDogs : [],
    allTemperaments : [],
    allDogsBackup: []
    
}

function rootReducer( state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                allDogs: action.payload,
                allDogsBackup: action.payload
            }
        
        case CREATE_DOG:
            console.log(action.payload)
            return{
                ...state,
                allDogs : [...state.allDogs,action.payload]
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }

        case FILTER_BY_TEMPERAMENT: 
            const allDogsCopy = [...state.allDogsBackup] // tiene que ser el backup pq allDogs cambia a medida que voy filtrando...
            
            if(action.payload.length == 0){
                return{
                    ...state,
                    allDogs: state.allDogsBackup // aca tengo que devolver la copia porque si devuelvo allDogs, voy a obtener los filtrados,
                }
            }

            const dogsFiltered = allDogsCopy.filter( dog => {
                return action.payload.some( temp => dog.temperaments?.includes(temp))
            })

            return{
                ...state,
                allDogs: dogsFiltered
            }
        
        case FILTER_BY_ORIGIN:
            const copyAllDogs = [...state.allDogsBackup]
            

            if(action.payload == 'ALL'){
                return{
                    ...state,
                    allDogs: state.allDogsBackup
                }
            }
            
            return{
                ...state,
                allDogs: action.payload == 'DB' ? copyAllDogs.filter( dog => dog.created) : copyAllDogs.filter(dog => !dog.created),
            }
        
        case FILTER_BY_ORDER:
            return{
                ...state,
                allDogs : action.payload == 'A' 
                                                ? [...state.allDogsBackup].sort( (a,b) => {
                                                    if(a.nombre.toUpperCase() > b.nombre.toUpperCase()) return 1;
                                                    if(a.nombre.toUpperCase() < b.nombre.toUpperCase()) return -1;
                                                    return 0;
                                                    })
                                                : [...state.allDogsBackup].sort( (a,b) => {
                                                    if(a.nombre.toUpperCase() > b.nombre.toUpperCase()) return -1;
                                                    if(a.nombre.toUpperCase() < b.nombre.toUpperCase()) return 1;
                                                    return 0;
                                                    })
            }
        
        case GET_DOG_BY_RAZA:
            return{
                ...state,
                allDogs: [action.payload]
            }

        case FILTER_BY_WEIGTH:
            return {
                ...state,
                allDogs: action.payload === 'A'
                                                ? [...state.allDogsBackup].sort((a, b) => {
                                                    // Si 'a' tiene peso NaN, colócalo al final
                                                    if (isNaN(a.peso_min)) return 1;
                                                    // Si 'b' tiene peso NaN, colócalo al final
                                                    if (isNaN(b.peso_min)) return -1;
                                                    // Ordenar normalmente por peso
                                                    return parseFloat(a.peso_min) - parseFloat(b.peso_min);
                                                    }) 
                                                : [...state.allDogsBackup].sort((a, b) => {
                                                    // Si 'a' tiene peso NaN, colócalo al final
                                                    if (isNaN(a.peso_min)) return 1;
                                                    // Si 'b' tiene peso NaN, colócalo al final
                                                    if (isNaN(b.peso_min)) return -1;
                                                    // Ordenar normalmente por peso
                                                    return parseFloat(b.peso_min) - parseFloat(a.peso_min);
                                                    })
            };
        
        default:
            return state;
    }
}
export default rootReducer;