import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Constantes
const dataInicial = {
    loading: false,
    limite: {},
    limites: []
}

//Types
const LIMITES_EXITO = 'LIMITES_EXITO'
const LIMITE_TODOS_EXITO = 'LIMITE_TODOS_EXITO'
const ERROR = 'ERROR'
const LOADING = 'LOADING'

//Reducers
export default function limitesReducers(state = dataInicial, action){
    switch (action.type) {
        case LIMITE_TODOS_EXITO:
            return {...state, limites: action.payload}
        case LIMITES_EXITO:
            return{...state, limite: action.payload}
        case ERROR:
            return {...dataInicial }
        default:
            return {...state}
    }
}


//Actions
export const obtenerLimitePorLinea = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if(accountid != undefined){
            const response = await axios.get(`${UrlApiDynamics}Limiteporlinea?filter=new_lineatipodeoperacion eq 100000000 and _new_cuenta_value eq ${accountid}&cuit=${Entidad}`)
            const limite = response.data
            dispatch({
                type: LIMITES_EXITO,
                payload: limite[0]
            })      
        }
    } catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerTodosLimitesPorLineas = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        if(accountid != undefined){
            fetch(`${UrlApiDynamics}Limiteporlinea?filter=_new_cuenta_value eq ${accountid}&cuit=${Entidad}`)
            .then(response => response.json())
            .then(data => {
                const limite = data
                if(limite != undefined){
                    dispatch({
                        type: LIMITE_TODOS_EXITO,
                        payload: limite
                    })
                }
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR
        })
    }
}