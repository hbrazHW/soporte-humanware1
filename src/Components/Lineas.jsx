import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTodosLimitesPorLineas } from '../Redux/LimitePorLinea'
import Tabla from '../Components/Tabla'
import { COLUMNS2 } from '../Tables/columns'
import { COLUMNS } from '../Tables/LimitesPorOperacionColumns'
import { useSpring, animated } from 'react-spring'
import { obtenerDivisas } from '../Redux/Divisa'

export const Lineas = () => {
    //Constantes
    const dispatch = useDispatch()
    const [limites, setLimites] = React.useState([])
    const [columnasLineas, setColumnasLineas] = React.useState([])
    const [columnasLineasPorOperacion, setColumnasLineasPorOperacion] = React.useState([])
    const [llamadaLimites, setLlamadaLimites] = React.useState(false)
    const [registros, setRegistros] = React.useState()
    const [llamada, setLlamada] = React.useState(false)
    //Estados
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const limiteSelector = useSelector(store => store.limiteporlinea.limites)
    const divisasSelector = useSelector(store => store.divisas.divisas)

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    React.useEffect(async () => {
        if (activo) {
            if (limiteSelector.length > 0) {
                setLimites(limiteSelector)
                if(document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
                if(document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
            } else if(llamadaLimites === false){
                await obtenerLimites()
                setLlamadaLimites(true)
                setTimeout(() => {
                    if(document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                    if(document.getElementById("spinner2") !== null) {
                        document.getElementById("spinner2").hidden = true;
                    }
                    setRegistros('No se encontraron registros')
                }, 3000);
            }
            // if(divisasSelector.length === 0 && llamada === false){
            //     setLlamada(true)
            //     await dispatch(obtenerDivisas())
            // }
            setColumnasLineas(COLUMNS2)
            setColumnasLineasPorOperacion(COLUMNS)
        }
    }, [activo, limiteSelector])

    const obtenerLimites = async () => {
        dispatch(obtenerTodosLimitesPorLineas(accountid))
    }

    return (
        <animated.div className="container min-vh-100 mt-5" style={fade}>
            <div className="w-100">
                <div className="card shadow p-3 border-0 pad">
                    <div className="contenedor-spinner" id="spinner1">
                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    {limites.length > 0 ? (<Tabla lineas={limites.filter((limite) => limite.new_lineatipodeoperacion == 100000000)} columnas={columnasLineas} titulo={'Límites por Línea General'} />) : <p className="color-textp-lista fw-bolder m-0">{registros}</p> }
                </div>
            </div>
            <div className="w-100 mt-4 mb-4">
                <div className="card shadow p-3 border-0 pad">
                    <div className="contenedor-spinner" id="spinner2">
                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    {limites.length > 0 ? (<Tabla lineas={limites.filter((limite) => limite.new_lineatipodeoperacion != 100000000)} columnas={columnasLineasPorOperacion} titulo={'Límites por Operación Activos'} />) :  <p className="color-textp-lista fw-bolder m-0">{registros}</p> }
                </div>
            </div>
        </animated.div>
    )
}
