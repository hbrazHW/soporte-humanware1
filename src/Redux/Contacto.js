import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    contactos: [],
    contacto: {}
}

//Types
const CONTACTOS_EXITO = 'CONTACTOS_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function contactosReducers(state = dataInicial, action) {
    switch (action.type) {
        case CONTACTOS_EXITO:
            return { ...state, contacto: action.payload }
        default:
            return { ...dataInicial }
    }
}

//Actions
export const obtenerContacto = (contactid) => async (dispatch) => {
    
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.get(`${UrlApiDynamics}Contacto?filter=contactid eq ${contactid}&cuit=${Entidad}`)
        dispatch({
            type: CONTACTOS_EXITO,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR
        })
    }
}