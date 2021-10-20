import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'
//Const
const dataInicial = {
    loading: false,
    garantia:{},
    garantias: []
}

//Types
const GARANTIA_EXITO = 'GARANTIA_EXITO'
const TODAS_GARANTIAS_EXITO = 'TODAS_GARANTIAS_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'
const TODAS_GARANTIAS_EXITO_INICIO = 'TODAS_GARANTIAS_EXITO_INICIO'

//Reducers
export default function garantiasReducers(state = dataInicial, action){
    switch (action.type) {
        case TODAS_GARANTIAS_EXITO_INICIO:
            return { ...state, garantias: action.payload, loading: false, garantia: action.garantia }
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, loading: true }
        case TODAS_GARANTIAS_EXITO:
            return { ...state, garantias: action.payload, loading: false }
        case GARANTIA_EXITO:
            return { ...state, garantia: action.payload }
        default:
            return { ...state }
    }
}

//Actions
export const obtenerGarantias = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Garantia?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
            const garantia = response.data
            dispatch({
                type: GARANTIA_EXITO,
                payload: garantia[0]
            })      
        }
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerTodasGarantias = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios(`${UrlApiDynamics}Garantia?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
            console.log(response.data)
            dispatch({
                    type: TODAS_GARANTIAS_EXITO,
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

export const obtenerTodasGarantiasInicio = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios(`${UrlApiDynamics}Garantia?filter=_new_socioparticipe_value eq ${accountid}&cuit=${Entidad}`)
            const garantia = response.data
            dispatch({
                    type: TODAS_GARANTIAS_EXITO_INICIO,
                    payload: response.data,
                    garantia: garantia[0]
                })    
        } 
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}