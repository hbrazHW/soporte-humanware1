import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    documentos: []
}

const DOCUMENTO_EXITO = 'DOCUMENTO_EXITO'
const TODOS_DOCUMENTO_EXITO = 'TODOS_DOCUMENTO_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function documentosReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, loading: true }
        case TODOS_DOCUMENTO_EXITO:
            return { ...state, documentos: action.payload, loading: false }
        // case DOCUMENTO_OPERACION_EXITO:
        //     return { ...state, documento: action.payload }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerDocumentos = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        const response = await axios.get(`${UrlApiDynamics}Documentacion?filter=&cuit=${Entidad}`)
        dispatch({
            type: TODOS_DOCUMENTO_EXITO,
            payload: response.data
        })      
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}