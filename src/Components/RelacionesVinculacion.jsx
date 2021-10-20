import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'
import { obtenerRelaciones } from '../Redux/RelacionDeVinculacion'

const RelacionesVinculacion = () => {
    const dispatch = useDispatch()
    const [relaciones, setRelaciones] = React.useState([])
    const [llamada, setLlamada] = React.useState(false)

    const relacionesSelector = useSelector(store => store.relaciones.relaciones)
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)

    React.useEffect(async () => {
        debugger;
        if (activo) {
            if (relacionesSelector.length > 0) {
                setRelaciones(relacionesSelector)
                if (document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
                if (document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
                if (document.getElementById("spinner3") !== null) {
                    document.getElementById("spinner3").hidden = true;
                }
                if (document.getElementById("spinner4") !== null) {
                    document.getElementById("spinner4").hidden = true;
                }
                if (document.getElementById("spinner5") !== null) {
                    document.getElementById("spinner5").hidden = true;
                }
            } else if (relacionesSelector.length === 0 && llamada === false) {
                setTimeout(() => {
                    obtenerRelacionesPorCuenta(accountid)
                }, 1000);
                setLlamada(true)
                setTimeout(() => {
                    if (document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                    if (document.getElementById("spinner2") !== null) {
                        document.getElementById("spinner2").hidden = true;
                    }
                    if (document.getElementById("spinner3") !== null) {
                        document.getElementById("spinner3").hidden = true;
                    }
                    if (document.getElementById("spinner4") !== null) {
                        document.getElementById("spinner4").hidden = true;
                    }
                    if (document.getElementById("spinner5") !== null) {
                        document.getElementById("spinner5").hidden = true;
                    }
                }, 3000);
            }
        }
    }, [activo, relacionesSelector])

    const obtenerRelacionesPorCuenta = async () => {
        dispatch(obtenerRelaciones(accountid))
    }
    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    return (
        <animated.div className="container min-vh-100" style={fade}>
            <div className="row pb-5">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-2 mt-3">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Titulares</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6 col-sm-6 ">
                                        Nombre
                                    </div>
                                    <div className="col-6 col-sm-6 text-end">
                                        
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner1">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto mh-100 shadow-sm">
                                    {
                                        relaciones.filter((itemRelacion) => itemRelacion.new_tipoderelacion == 100000000).map(item => {
                                            return (
                                                <li key={item.new_participacionaccionariaid} className="list-group-item borde-0">
                                                    <div className="row align-items-center pt-1 pb-1">
                                                        <div className="col-8 col-sm-8 m-0 p-0 text-start">
                                                            <p className="text-lowercase m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-4 m-0 text-end">
                                                            <p className="text-lowercase color-textp-lista m-0 texto-lista">
                                                                {/* {(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-2 mt-3">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Accionistas</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6 col-sm-6 ">
                                        Nombre
                                    </div>
                                    <div className="col-6 col-sm-6 text-end">
                                        % de Participación
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner2">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto mh-100 shadow-sm">
                                    {
                                        relaciones.filter((itemRelacion) => itemRelacion.new_tipoderelacion == 100000001).map(item => {
                                            return (
                                                <li key={item.new_participacionaccionariaid} className="list-group-item borde-0">
                                                    <div className="row align-items-center pt-1 pb-1">
                                                        <div className="col-8 col-sm-8 m-0 p-0 text-start">
                                                            <p className="text-lowercase m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-4 m-0 text-end">
                                                            <p className="text-lowercase color-textp-lista m-0 texto-lista">
                                                                 {(item.new_porcentajedeparticipacion) ? item.new_porcentajedeparticipacion : '---'} 
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-2 mt-3">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Beneficiarios</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6 col-sm-6 ">
                                        Nombre
                                    </div>
                                    <div className="col-6 col-sm-6 text-end">
                                        Porcentaje
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner3">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto mh-100 shadow-sm">
                                    {
                                        relaciones.filter((itemRelacion) => itemRelacion.new_tipoderelacion == 100000002).map(item => {
                                            return (
                                                <li key={item.new_participacionaccionariaid} className="list-group-item borde-0">
                                                    <div className="row align-items-center pt-1 pb-1">
                                                        <div className="col-8 col-sm-8 m-0 p-0 text-start">
                                                            <p className="text-lowercase m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-4 m-0 text-end">
                                                            <p className="text-lowercase color-textp-lista m-0 texto-lista">
                                                                {(item.new_porcentajebeneficiario) ? item.new_porcentajebeneficiario : '---'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-2 mt-3">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Miembros del Directorio</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6 col-sm-6 ">
                                        Nombre
                                    </div>
                                    <div className="col-6 col-sm-6 text-end">
                                        Cargo
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner4">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto mh-100 shadow-sm">
                                    {
                                        relaciones.filter((itemRelacion) => itemRelacion.new_tipoderelacion == 100000003).map(item => {
                                            return (
                                                <li key={item.new_participacionaccionariaid} className="list-group-item borde-0">
                                                    <div className="row align-items-center pt-1 pb-1">
                                                        <div className="col-8 col-sm-8 m-0 p-0 text-start">
                                                            <p className="text-lowercase m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-4 m-0 text-end">
                                                            <p className="text-lowercase color-textp-lista m-0 texto-lista">
                                                                 {(item.new_cargo) ? (item.new_cargo): '---'} 
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-2 mt-3">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Representantes Legales/Apoderados</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6 col-sm-6 ">
                                        Nombre
                                    </div>
                                    <div className="col-6 col-sm-6 text-end">
                                        
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner5">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto mh-100 shadow-sm">
                                    {
                                        relaciones.filter((itemRelacion) => itemRelacion.new_tipoderelacion == 100000004).map(item => {
                                            return (
                                                <li key={item.new_participacionaccionariaid} className="list-group-item borde-0">
                                                    <div className="row align-items-center pt-1 pb-1">
                                                        <div className="col-8 col-sm-8 m-0 p-0 text-start">
                                                            <p className="text-lowercase m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 col-sm-4 m-0 text-end">
                                                            <p className="text-lowercase color-textp-lista m-0 texto-lista">
                                                                {/* {(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default RelacionesVinculacion