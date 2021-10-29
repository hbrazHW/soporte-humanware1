import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'

//constantes

const dataInicial = {
    loading: false,
    asuntos: []
}


//types
const OBTENER_ASUNTOS_EXITO = 'OBTENER_ASUNTOS_EXITO'
const LOADING = 'LOADING'
const ERROR  = 'ERROR'

//reducers
export default function asuntosReducers(state = dataInicial, action){
    switch(action.type){
        case ERROR:
            return{...dataInicial}
        case LOADING:
            return{...state,loading: true }  
        case OBTENER_ASUNTOS_EXITO:
            return {...state,asuntos:action.payload, loading: false }
          default:
              return{ ...state }        

    }
}

// actions 
export const obtenerAsunto  = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.get(`${UrlApiDynamics}Asuntos?filter=&cuit=${Entidad}`)
        dispatch({
            type: OBTENER_ASUNTOS_EXITO,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type:ERROR
        })
        
    }
}
