import axios from 'axios'
import {Entidad, UrlApiDynamics} from '../Keys'

//Const
const dataInicial = {
    loading: false,
    id:{},
    resultado: ''
}

//Types
const CARGA_PRECALIFICACION = 'CARGA_PRECALIFICACION'
const CUENTA_EXISTENTE = 'CUENTA_EXISTENTE'
const LOADING = "LOADING"
const ERROR = 'ERROR'
const LIMPIAR_RESULTADO = 'LIMPIAR_RESULTADO'

//Reducers
export default function PrecalificacionReducers(state = dataInicial, action){
    switch (action.type) {
        case ERROR: 
            return { ...dataInicial }
        case LOADING:
            return { ...state, resultado: action.resultado }
        case CARGA_PRECALIFICACION:
            return { ...state, id: action.payload, loading: false, resultado: action.resultado }
        case CUENTA_EXISTENTE:
            return { ...state, resultado: action.resultado }
        case LIMPIAR_RESULTADO:
            return { ...state, resultado: action.resultado }
        default:
            return { ...state }
    }
}

export const cargarPrecalificacionCrediticia = (personeria, razonSocial, cuit, tipoDocumento, telefono, email, nombre, apellido, 
    producto, actividad, tipoSocietario, facturacion, tipoRelacion, cantidadMujeres, empleadas, discapacitados) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultado: 'LOADING'
    })
    debugger;
    try {
        const comprobacionRazonSocial = await axios.get(`${UrlApiDynamics}Account?filter=name eq '${razonSocial}'&cuit=${Entidad}`)
        const comprobacionMail = await axios.get(`${UrlApiDynamics}Account?filter=emailaddress1 eq '${email}'&cuit=${Entidad}`)
        if(comprobacionMail.data.length === 0 && comprobacionRazonSocial.data.length === 0)
        {
            const response = await axios.post(`${UrlApiDynamics}Precalificacion?personeria=${personeria.value}&razonSocial=${razonSocial}
                &cuit=${cuit}&tipoDocumento=${tipoDocumento.value}&telefono=${telefono}&email=${email}&nombreContacto=${nombre}&apellido=${apellido}
                &productoServicio=${producto}&actividadAFIP=${actividad.value}&tipoSocietario=${tipoSocietario.value}&facturacion=${facturacion}
                &tipoRelacion=${tipoRelacion.value}&cantidadMujeres=${cantidadMujeres}&empleadas=${empleadas}&discapacitados=${discapacitados}&cuitSgr=${Entidad}`)
            dispatch({
                type: CARGA_PRECALIFICACION,
                resultado: 'EXITO',
                payload: response.data
            })
        }else{
            dispatch({
                type: CUENTA_EXISTENTE,
                resultado: 'ERROR'
            })
        }
        
    } catch (error) {
        dispatch({
            type : ERROR
        })
    }
}

export const limpiarResultado = () => async (dispatch) => {
    dispatch({
        type : LIMPIAR_RESULTADO, 
        resultado: 'PENDIENTE'
    })
}
