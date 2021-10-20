import axios from 'axios'
import StateManager from 'react-select'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    Bancos: [],
    BancosPorSocios: [],
    crearCuenta: ''
}

//Types
const BANCOS_EXITO = 'BANCOS_EXITO'
const BANCOSXSOCIO_EXITO = 'BANCOSXSOCIO_EXITO'
const CREAR_CUENTA_EXITO = 'CREAR_CUENTA_EXITO'
const LOADING_CUENTA = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function BancosReducers(state = dataInicial, action) {
    switch (action.type) {
        case BANCOS_EXITO:
            return { ...state, Bancos: action.payload }
        case BANCOSXSOCIO_EXITO:
            return { ...state, BancosPorSocios: action.payload }
        case CREAR_CUENTA_EXITO:
            return { ...state, crearCuenta: action.crearCuenta }
        case LOADING_CUENTA:
            return { ...state, crearCuenta: action.crearCuenta }
        default:
            return { ...dataInicial }
    }
}

//Actions
export const obtenerBancos = () => async (dispatch) => {
    // dispatch({
    //     type: LOADING
    // })

    try {
        const response = await axios.get(`${UrlApiDynamics}Bancos?filter=&cuit=${Entidad}`)
        dispatch({
            type: BANCOS_EXITO,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}

export const obtenerBancosXsocio = (accountid) => async (dispatch) => {
    // dispatch({
    //     type: LOADING
    // })
    
    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Bancosporsocio?filter=_new_socio_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: BANCOSXSOCIO_EXITO,
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

export const CrearCuentaXsocio = (accountid, banco, cbu = "", nroCuenta = "") => async (dispatch) => {
    dispatch({
        type: LOADING_CUENTA,
        crearCuenta: 'LOADING'
    })

    try {
        const response = await axios.post(`${UrlApiDynamics}Bancosporsocio?socio=${accountid}&banco=${banco.value}&cbu=${cbu}&nroCuenta=${nroCuenta}&cuit=${Entidad}`)
        dispatch({
            type: CREAR_CUENTA_EXITO,
            crearCuenta: 'EXITO'
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            crearCuenta: 'ERROR'
        })
    }
}