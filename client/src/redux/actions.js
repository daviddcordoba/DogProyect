import axios from 'axios';

export const GET_DOGS = "GET_DOGS";

export function getDogs(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }
}

export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"

export function getTemperaments(){
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data // me llega asi [{id:1,nombre:'temperamento'}]
        })
    }
}

export const CREATE_DOG = "CREATE_DOG";

export function createDog(newDog){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs',newDog);
        return dispatch({
            type:CREATE_DOG,
            payload: response.data
        })
    }
}

export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";

export function filterByTemperament(temperaments){
    return{
        type: FILTER_BY_TEMPERAMENT,
        payload: temperaments
    }
}


export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';

export function filterByOrigin(origin){
    return{
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const GET_DOG_BY_RAZA = 'GET_DOG_BY_RAZA';

export function getDogByRaza(raza){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/dogs?name=${raza}`);
        return dispatch({
            type: GET_DOG_BY_RAZA,
            payload: response.data
        })
    }
}

export const FILTER_BY_ORDER = 'FILTER_BY_ORDER'

export function filterByOrder(order){
    return{
        type: FILTER_BY_ORDER,
        payload: order
    }
}


export const FILTER_BY_WEIGTH = 'FILTER_BY_WEIGTH'

export function filterByWeigth(weigth){
    return{
        type: FILTER_BY_WEIGTH,
        payload: weigth
    }
}


