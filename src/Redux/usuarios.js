import axios from 'axios'
import { auth, firebase } from '../Firebase'
import { Entidad, UrlApiDynamics } from '../Keys'

//constantes
const dataInicial = {
    loading: false,
    activo: false,
    error: false,
    accountid: '',
    resultado: '',
    contactid: ''
}

//Types auth/wrong-password
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'
const REGISTRO_USUARIO = 'REGISTRO_USUARIO'
const USUARIO_ACTUALIZACION = 'USUARIO_ACTUALIZACION'
const LIMPIAR_ERROR = 'LIMPIAR_ERROR'
const REGISTRO_USUARIO_EXISTENTE = 'REGISTRO_USUARIO_EXISTENTE'
const RECUPERO_EXITO = 'RECUPERO_EXITO'

//Reducers
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case USUARIO_ACTUALIZACION:
            return { ...state }
        case REGISTRO_USUARIO:
            return { ...state, loading: false, user: action.payload, activo: true, contactid: action.contactid, error: false, resultado: action.resultado }
        case CERRAR_SESION:
            return { ...dataInicial, loading: false, activo: false }
        case USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload, activo: true, error: false, resultado: action.resultado, contactid: action.contactid, accountid: action.accountid }
        case REGISTRO_USUARIO_EXISTENTE:
            return { ...state, resultado: action.resultado }
            case USUARIO_ERROR:
            return { ...dataInicial, error: true, resultado: action.resultado }
        case LIMPIAR_ERROR:
            return { ...state, error: false }
        case LOADING:
            return { ...state, resultado: action.resultado }
        default:
            return { ...state }
    }
}

//Actions
export const loginUsuario = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        let contactid = undefined
        let accountid = undefined
        const resp = await auth.signInWithEmailAndPassword(email, pass)
        debugger;
        await firebase.collection('usuarios').doc(resp.user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    debugger;
                    const documento = doc.data()
                    contactid = documento.contactid
                    accountid = documento.accountid
                    localStorage.setItem('usuario', JSON.stringify({
                        email: resp.user.email,
                        uid: resp.user.uid,
                        contactid: documento.contactid,
                        accountid: documento.accountid
                    }))
                }
            })

        dispatch({
            type: USUARIO_EXITO,
            contactid: contactid,
            accountid: accountid,
            payload: {
                email: resp.user.email,
                uid: resp.user.uid,
                // contacid: contacid
                // accountid: accountid
            }
        })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const registrarUsuario = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultado: 'LOADING',
    })

    try {
        
        const respMail = await axios.get(`${UrlApiDynamics}Account?filter=emailaddress1 eq '${email}'&cuit=${Entidad}`)
        debugger;
        if (respMail.data.length > 0) {
            const accountid = respMail.data[0].Accountid;
            const resp = await auth.createUserWithEmailAndPassword(email, pass)
            //Crea un registro de usuario
            await firebase.collection('usuarios').doc(resp.user.uid).set({
                email: resp.user.email,
                uid: resp.user.uid,
                accountid: accountid
            })

            localStorage.setItem('usuario', JSON.stringify({
                email: resp.user.email,
                uid: resp.user.uid,
                accountid: accountid
            }))

            dispatch({
                type: REGISTRO_USUARIO,
                accountid: accountid,
                resultado: 'EXITO',
                payload: {
                    email: resp.user.email,
                    uid: resp.user.uid,
                    accountid: accountid
                }
            })
        }else{
            dispatch({
                type: REGISTRO_USUARIO_EXISTENTE,
                resultado: 'ERROR',
            })
        }

    } catch (error) {
        dispatch({
            type: USUARIO_ERROR, 
            resultado: 'ERROR'
        })
    }
}

export const registrarUsuarioContacto = (email, pass) => async (dispatch) => {
    dispatch({
        type: LOADING,
        resultado: 'LOADING',
    })

    try {
        debugger;
        const respMail = await axios.get(`${UrlApiDynamics}Contacto?filter=emailaddress1 eq '${email}'&cuit=${Entidad}`)
        if (respMail.data.length > 0) {
            const contactid = respMail.data[0].contactid;
            const resp = await auth.createUserWithEmailAndPassword(email, pass)
            //Crea un registro de usuario
            await firebase.collection('usuarios').doc(resp.user.uid).set({
                email: resp.user.email,
                uid: resp.user.uid,
                contactid: contactid
            })

            localStorage.setItem('usuario', JSON.stringify({
                email: resp.user.email,
                uid: resp.user.uid,
                contactid: contactid
            }))

            dispatch({
                type: REGISTRO_USUARIO,
                contactid: contactid,
                resultado: 'EXITO',
                payload: {
                    email: resp.user.email,
                    uid: resp.user.uid,
                    contactid: contactid
                }
            })
        }else{
            dispatch({
                type: REGISTRO_USUARIO_EXISTENTE,
                resultado: 'ERROR',
            })
        }

    } catch (error) {
        dispatch({
            type: USUARIO_ERROR, 
            resultado: 'ERROR'
        })
    }
}

export const cerrarSesion = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        //Cierra sesion en firestore
        auth.signOut()
        //Eliminamos el usuario del local storage
        localStorage.removeItem('usuario')
        dispatch({
            type: CERRAR_SESION
        })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivo = () => (dispatch) => {
    if (localStorage.getItem('usuario')) {
        const user = JSON.parse(localStorage.getItem('usuario'))
        dispatch({
            type: USUARIO_EXITO,
            payload: user,
            contactid: user.contactid

        })
    }
}

export const actualizarAccountid = (uid) => async (dispatch) => {
    try {
        await firebase.collection('usuarios').doc(uid).get()
            .then((doc) => {
                debugger;
                if (doc.exists) {
                    const documento = doc.data()
                    dispatch({
                        type: USUARIO_ACTUALIZACION,
                        contactid: documento.contactid
                    })
                }
            })
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const limpiarError = () => (dispatch) => {
    dispatch({
        type: LIMPIAR_ERROR
    })
}

export const recuperarContraseña = (email) => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const resp = await auth.sendPasswordResetEmail(email)

    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}