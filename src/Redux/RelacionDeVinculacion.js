import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    relaciones: []
}

//Types
const RELACIONES_EXITO = 'RELACIONES_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function relacionesReducers(state = dataInicial, action) {
    switch (action.type) {
        case RELACIONES_EXITO:
            return { ...state, relaciones: action.payload }
        default:
            return { ...dataInicial }
    }
}

//Actions
export const obtenerRelaciones = (accountid) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        if (accountid != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Relacionesvinculacion?filter=_new_cuentaid_value eq ${accountid}&cuit=${Entidad}`)
            dispatch({
                type: RELACIONES_EXITO,
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