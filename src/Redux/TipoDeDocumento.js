import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    tiposDocumentos: []
}

const TIPODOCUMENTO_EXITO = 'TIPODOCUMENTO_EXITO'
const TODOS_TIPDOCUMENTO_EXITO = 'TODOS_TIPDOCUMENTO_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function tipoDocumentosReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, loading: true }
        case TODOS_TIPDOCUMENTO_EXITO:
            return { ...state, tiposDocumentos: action.payload, loading: false }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerTipoDeDocumentos = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        debugger;
        const response = await axios.get(`${UrlApiDynamics}Tipodedocumento?filter=&cuit=${Entidad}`)
        dispatch({
            type: TODOS_TIPDOCUMENTO_EXITO,
            payload: response.data
        })      
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}