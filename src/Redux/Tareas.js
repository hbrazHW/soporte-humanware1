import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    tareas: []
}

const TAREAS_EXITO = 'TAREAS_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function tareasReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, loading: true }
        case TAREAS_EXITO:
            return { ...state, tareas: action.payload }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerTareas = (id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        debugger;
        const response = await axios.get(`${UrlApiDynamics}Notas?filter=_objectid_value eq ${id}&cuit=${Entidad}`)
        dispatch({
            type: TAREAS_EXITO,
            payload: response.data
        })      
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}