import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    documentos: [],
    resultadoOperacion: ''
}

const DOCUMENTO_OPERACION_EXITO = 'DOCUMENTO_OPERACION_EXITO'
const CARGA_DOCUMENTOXOPERACION = 'CARGA_DOCUMENTOXOPERACION'
const TODOS_DOCUMENTO_OPERACION_EXITO = 'TODOS_DOCUMENTO_OPERACION_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'


//Reducers
export default function documentosOperacionReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial, resultadoOperacion: action.resultadoOperacion }
        case LOADING:
            return { ...state, resultadoOperacion: action.resultadoOperacion }
        case TODOS_DOCUMENTO_OPERACION_EXITO:
            return { ...state, documentos: action.payload }
        case CARGA_DOCUMENTOXOPERACION:
             return { ...state, documentos: action.payload, resultadoOperacion: action.resultadoOperacion }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerDocumentosPorOperacion = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Documentacionporoperacion?filter=&cuit=${Entidad}`)

            dispatch({
                type: TODOS_DOCUMENTO_OPERACION_EXITO,
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

export const cargarDocumentacionPorOperacion = (nombre, opId, docId, fecha, firmaDigital) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultadoOperacion: 'LOADING'
    })

    try {
        const response = await axios.post(`${UrlApiDynamics}Documentacionporoperacion?nombre=${nombre}&opId=${opId}&docId=${docId}&fecha=${fecha}&firmaDigital=${firmaDigital}&cuit=${Entidad}`)
        const docu = {
            new_documentacionporoperacionid: response.data,
            new_name: nombre,
            new_firmadigital: firmaDigital,
            _new_documento_value: docId,
            _new_operacion_value: opId,
            new_fechadevencimiento: fecha
        }
        dispatch({
            type: CARGA_DOCUMENTOXOPERACION,
            payload: docu,
            resultadoOperacion: 'EXITO'
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            resultadoOperacion: 'ERROR'
        })
    }
}