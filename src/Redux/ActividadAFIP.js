import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'

//Const
const dataInicial = {
    loading: false,
    actividades: []
}

const TODAS_ACTIVIDADES_EXITO = 'TODAS_ACTIVIDADES_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function actividadesAFIPReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, loading: true }
        case TODAS_ACTIVIDADES_EXITO:
            return { ...state, actividades: action.payload, loading: false }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerActividadesAFIP = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        debugger;
        const response = await axios.get(`${UrlApiDynamics}Actividadafip?filter=&cuit=${Entidad}`)
        dispatch({
            type: TODAS_ACTIVIDADES_EXITO,
            payload: response.data
        })      
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}