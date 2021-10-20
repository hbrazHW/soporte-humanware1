import axios from 'axios'
import { Entidad, UrlApiDynamics } from '../Keys'
//Const
const dataInicial = {
    loading: false,
    actividades:[]
}

//Types
const ACTIVIDADES_EXITO = 'ACTIVIDADES_EXITO'
const LOADING = "LOADING"
const ERROR = 'ERROR'

//Reducers
export default function actividadesReducers(state = dataInicial, action){
    switch (action.type) {
        case ACTIVIDADES_EXITO:
            return {...state, actividades: action.payload}
        default:
            return{ ...dataInicial }
    }
}

//Actions
export const obtenerActividades = (id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {
        debugger;
        if (id != undefined) {
            const response = await axios.get(`${UrlApiDynamics}Actividad?filter=_regardingobjectid_value eq '${id}'&cuit=${Entidad}`)
            dispatch({
                type: ACTIVIDADES_EXITO,
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