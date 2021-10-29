import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usuariosReducer from '../Redux/usuarios'
import notificacionReducer from '../Redux/notificacion'
import limitesReducers from '../Redux/LimitePorLinea'
import garantiasReducers from '../Redux/Garantia'
import operacionesReducers from '../Redux/Operaciones'
import documentosPorCuentaReducers from '../Redux/CarpetaDigital'
import notificacionesReducers from '../Redux/Notificaciones'
import documentosOperacionReducers from '../Redux/DocumentacionPorOperacion'
import documentosReducers from '../Redux/Documentacion'
import cuentaReducers from '../Redux/Cuenta'
import tipoDocumentosReducers from '../Redux/TipoDeDocumento'
import PrecalificacionReducers from '../Redux/PrecalificacionCrediticia'
import divisasReducers from '../Redux/Divisa'
import relacionesReducers from '../Redux/RelacionDeVinculacion'
import actividadesAFIPReducers from '../Redux/ActividadAFIP'
import BancosReducers from '../Redux/CuentasBancarias'
import casosReducers from '../Redux/Caso'
import actividadesReducers from '../Redux/Actividad'
import contactosReducers from '../Redux/Contacto'
import tareasReducers from '../Redux/Tareas'
import asuntosReducers from '../Redux/Asuntos'


const rootReducer = combineReducers({
   usuarios: usuariosReducer,
   notificaciones: notificacionReducer,
   limiteporlinea: limitesReducers,
   garantias: garantiasReducers,
   operaciones: operacionesReducers,
   documentosPorCuenta: documentosPorCuentaReducers,
   notificaciones: notificacionesReducers,
   documentosOperacion: documentosOperacionReducers,
   documentos: documentosReducers,
   cuenta: cuentaReducers,
   tiposDocumentos: tipoDocumentosReducers,
   precalificacion: PrecalificacionReducers,
   divisas: divisasReducers,
   relaciones: relacionesReducers,
   actividadesAFIP: actividadesAFIPReducers,
   bancos: BancosReducers,
   casos: casosReducers,
   actividades: actividadesReducers,
   contactos: contactosReducers, 
   tareas: tareasReducers,
   asunto: asuntosReducers,


})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    return store
}
