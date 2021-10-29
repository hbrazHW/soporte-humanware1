import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    casos: [],
    resultadoCaso: '',
    ticket: '',
    casoId: ''
}

//Types
const CASOS_EXITO = 'CASOS_EXITO'
const CARGA_CASOS_EXITO = 'CARGA_CASOS_EXITO'
const CASOSID_EXITO = 'CASOSID_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function casosReducers(state = dataInicial, action) {
    switch (action.type) {
        case CASOS_EXITO:
            return { ...state, casos: action.payload }
        case CARGA_CASOS_EXITO:
            return { ...state, resultadoCaso: action.resultadoCaso, ticket: action.ticket, resultadoCaso: action.resultadoCaso }
        case CASOSID_EXITO:
            return { ...state, casoId: action.casoId }
        default:
            return { ...dataInicial }
    }
}

//Actions
export const obtenerCasos = (contactid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    // customerid_contact eq ${contactid}
    debugger;
    try {
        if (contactid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Casos?filter=_customerid_value eq ${contactid}&cuit=${Entidad}`)
            dispatch({
                type: CASOS_EXITO,
                payload: response.data,
                resultadoCaso: 'PENDING'
            })
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const cargarCaso = (accountid, contactid, titulo, cliente, prioridad,fechaResolucion,descripcionResolucion, asunto, descripcion,file, config) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultadoCaso: 'LOADING'
    })
    try {
      debugger;  
        const response = await axios.post(`${UrlApiDynamics}Casos?accountid=${accountid}&contactid=${contactid}&titulo=${titulo}
            &cliente=${cliente.value}&prioridad=${prioridad.value}&descripcion=${descripcion}&fechaResolucion=${fechaResolucion}&descripcionResolucion=${descripcionResolucion}&asunto=${asunto.value}&cuit=${Entidad}`, file, config)
        dispatch({
            type: CARGA_CASOS_EXITO,
            ticket: response.data,
            resultadoCaso: 'EXITO'
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            resultadoCaso: 'ERROR'
        })
    }
}

export const obtenerCasoId = (id) => (dispatch) => {
    if (id !== undefined) {
        dispatch({
            type: CASOSID_EXITO,
            casoId: id
        })
    }
}