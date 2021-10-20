import React from 'react'
import {Toast} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {obtenerNotificaciones} from '../Redux/Notificaciones'

const Notificacion = () => {
    //Constantes
    const dispatch = useDispatch()
    const [notificaciones, setNotificaciones] = React.useState([])
    //Estados
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const notificacionesSelector = useSelector(store => store.notificaciones.notificaciones)
    
    React.useEffect(() => {
        debugger;
        if (activo) {
            if (notificacionesSelector.length > 0) {
                setNotificaciones(notificacionesSelector)
            }else{
                obtenerNotificacionesCuenta()
            }
        }
    }, [activo, notificacionesSelector])

    const obtenerNotificacionesCuenta = async () => {
        dispatch(obtenerNotificaciones(accountid))
    }

    return (
        <div>
            {/* <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast> */}
        </div>
    )
}

export default Notificacion
