import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTodasGarantias } from '../Redux/Garantia'
import Moment from 'moment'
import { useSpring, animated } from 'react-spring'

const Garantias = (props) => {
    //Constantes
    const dispatch = useDispatch()
    const [garantias, setGarantias] = React.useState([])
    const [llamadaGarantias, setLlamadaGarantias] = React.useState(false)

    //Estados
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const garantiasSelector = useSelector(store => store.garantias.garantias)
    const loading = useSelector(store => store.garantias.loading)


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
            if (garantiasSelector.length > 0) {
                setGarantias(garantiasSelector)
                if(document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
                if(document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
                if(document.getElementById("spinner3") !== null) {
                    document.getElementById("spinner3").hidden = true;
                }
                if(document.getElementById("spinner4") !== null) {
                    document.getElementById("spinner4").hidden = true;
                }
                if(document.getElementById("spinner5") !== null) {
                    document.getElementById("spinner5").hidden = true;
                }
                
            } else if (llamadaGarantias === false) {
                const res = await fetchUser()
                setLlamadaGarantias(true)
                setTimeout(() => {
                    if(document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                    if(document.getElementById("spinner2") !== null) {
                        document.getElementById("spinner2").hidden = true;
                    }
                    if(document.getElementById("spinner3") !== null) {
                        document.getElementById("spinner3").hidden = true;
                    }
                    if(document.getElementById("spinner4") !== null) {
                        document.getElementById("spinner4").hidden = true;
                    }
                    if(document.getElementById("spinner5") !== null) {
                        document.getElementById("spinner5").hidden = true;
                    }
                }, 3000);
            }
        }
    }, [activo, garantiasSelector])


    const fetchUser = async () => {
        const resp = dispatch(obtenerTodasGarantias(accountid))
    }

    return (
        <animated.div className="container" style={fade}>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Garantías Vigentes</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad ">
                                <div className="row p-3">
                                    <div className="col-5">
                                        Garantía
                                    </div>
                                    <div className="col-7 text-end">
                                        Fecha de Vencimiento
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner1">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group overflow-scroll lista-body">
                                    {
                                        garantias.filter((garantia) => garantia.statuscode == 100000001).map(item => {
                                            return (
                                                <li key={item.new_garantiaid} className="list-group-item h-100 p-0 pt-2 pb-2">
                                                    <div className="row d-flex align-items-center px-2">
                                                        <div className="col-8 m-0 ">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 m-0 text-center">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {garantias.filter((garantia) => garantia.statuscode == 100000001).length} Garantias
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Garantías Vencidas</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-5">
                                        Garantía
                                    </div>
                                    <div className="col-7 text-end">
                                        Fecha de Vencimiento
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner2">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group overflow-scroll lista-body">
                                    {
                                        garantias.filter((garantia) => garantia.statuscode == 100000000).map(item => {
                                            return (
                                                <li key={item.new_garantiaid} className="list-group-item h-100 p-0 pt-2 pb-2">
                                                    <div className="row d-flex align-items-center px-2">
                                                        <div className="col-8 m-0 ">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 m-0 text-center">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {garantias.filter((garantia) => garantia.statuscode == 100000000).length} Garantias
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Garantías Afrontadas</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-5">
                                        Garantía
                                    </div>
                                    <div className="col-7 text-end">
                                        Fecha de Vencimiento
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner3">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto lista-body">
                                    {
                                        garantias.filter((garantia) => garantia.statuscode == 100000002).map(item => {
                                            return (
                                                <li key={item.new_garantiaid} className="list-group-item h-100 p-0 pt-2 pb-2">
                                                    <div className="row d-flex align-items-center px-2">
                                                        <div className="col-8 m-0 ">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista" >{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 m-0 text-center">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {garantias.filter((garantia) => garantia.statuscode == 100000002).length} Garantias
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Garantías en Cartera</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-7">
                                        Garantía
                                    </div>
                                    <div className="col-5 text-end">
                                        Fecha de Vencimiento
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner4">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group overflow-scroll lista-body">
                                    {
                                        garantias.filter((garantia) => garantia.statuscode == 100000004).map(item => {
                                            return (
                                                <li key={item.new_productosid} className="list-group-item borde-0">
                                                    <div className="row d-flex align-items-center pt-2 pb-2">
                                                        <div className="col-7 m-0 p-0 text-start">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <span className="prefijo color-header fw-bolder color-secundario rounded-circle mx-2 text-uppercase">G</span>
                                                                </div>
                                                                <div className="col-10">
                                                                    <p className="text-lowercase fw-bolder m-0 color-textp-lista texto-lista" >{item.new_name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-5 m-0 text-end">
                                                            <p className="text-lowercase text-success m-0 fw-bolder texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {garantias.filter((garantia) => garantia.statuscode == 100000004).length} Garantias
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Garantías en Gestión</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-7">
                                        Garantía
                                    </div>
                                    <div className="col-5 text-end">
                                        Fecha de Vencimiento
                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner5">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto lista-body">
                                    {
                                        garantias.filter((garantia) => garantia.statuscode == 1).map(item => {
                                            return (
                                                <li key={item.new_productosid} className="list-group-item borde-0">
                                                    <div className="row d-flex align-items-center pt-2 pb-2">
                                                        <div className="col-7 m-0 p-0 text-start">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <span className="prefijo color-header fw-bolder color-secundario rounded-circle mx-2 text-uppercase">G</span>
                                                                </div>
                                                                <div className="col-10">
                                                                    <p className="text-lowercase m-0 fw-bolder color-textp-lista texto-lista" >{item.new_name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-5 m-0 text-end">
                                                            <p className="text-lowercase text-success m-0 fw-bolder texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {garantias.filter((garantia) => garantia.statuscode == 1).length} Garantias
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

export default Garantias
