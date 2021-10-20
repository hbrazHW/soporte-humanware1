import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    divisas: []
}

//Types
const DIVISAS_EXITO = 'DIVISAS_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function divisasReducers(state = dataInicial, action) {
    switch (action.type) {
        case DIVISAS_EXITO:
            return { ...state, divisas: action.payload }
        default:
            return { ...dataInicial }
    }
}

//Actions
export const obtenerDivisas = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        debugger;
        const response = await axios.get(`${UrlApiDynamics}Transactioncurrency?filter=&cuit=${Entidad}`)
        dispatch({
            type: DIVISAS_EXITO,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}