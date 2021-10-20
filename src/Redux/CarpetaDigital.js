import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    documento:{},
    documentos: [],
    cargaDocumento: ''
}

//Types
const CARGA_DOCUMENTOXCUENTA = 'CARGA_DOCUMENTOXCUENTA'
const DOCUMENTOXCUENTA_EXITO = 'DOCUMENTOXCUENTA_EXITO'
const TODOS_DOCUMENTOXCUENTA_EXITO = 'TODOS_DOCUMENTOXCUENTA_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function documentosPorCuentaReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial, cargaDocumento: action.cargaDocumento }
        case LOADING:
            return { ...state, cargaDocumento: action.cargaDocumento }
        case TODOS_DOCUMENTOXCUENTA_EXITO:
            return { ...state, documentos: action.payload, loading: false }
        case DOCUMENTOXCUENTA_EXITO:
            return { ...state, documento: action.payload }
        case CARGA_DOCUMENTOXCUENTA:
            return { ...state, cargaDocumento: action.cargaDocumento }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerDocumentosPorCuenta = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Documentacionporcuenta?filter=_new_cuentaid_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: TODOS_DOCUMENTOXCUENTA_EXITO,
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

export const cargarDocumentacionPorCuenta = (file, config, documentoId, documento) => async (dispatch) => {
    dispatch({
        type: LOADING,
        cargaDocumento: 'LOADING'
    })

    try {
        debugger;
        const response = await axios.post(`${UrlApiDynamics}Documentacionporcuenta?documento=${documentoId}&cuit=${Entidad}`, file, config)
        dispatch({
            type: CARGA_DOCUMENTOXCUENTA,
            cargaDocumento: 'EXITO'
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            cargaDocumento: 'ERROR'
        })
    }
}