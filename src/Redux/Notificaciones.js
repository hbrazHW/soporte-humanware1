import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    notificaciones:[]
}

//Types
const NOTIFICACIONES_EXITO = 'NOTIFICACIONES_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function notificacionesReducers(state = dataInicial, action){
    switch (action.type) {
        case NOTIFICACIONES_EXITO:
            return {...state, notificaciones: action.payload}
        default:
            return{ ...dataInicial }
    }
}

//Actions
export const obtenerNotificaciones = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Tareas?filter=_regardingobjectid_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: NOTIFICACIONES_EXITO,
                payload: response.data
            })      
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}