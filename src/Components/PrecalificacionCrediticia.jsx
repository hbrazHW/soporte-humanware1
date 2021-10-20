import React from 'react'
import { Toast, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { cargarPrecalificacionCrediticia } from '../Redux/PrecalificacionCrediticia'
import { obtenerTipoDeDocumentos } from '../Redux/TipoDeDocumento'
import { obtenerActividadesAFIP } from '../Redux/ActividadAFIP'
import { useSpring, animated, interpolate } from 'react-spring'
import ReCAPTCHA from 'react-google-recaptcha'
import { RecaptchaKey } from '../Keys'
import { useHistory } from "react-router-dom"
import Select from 'react-select';
import CurrencyFormat from 'react-currency-format';

const PrecalificacionCrediticia = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const [personeria, setPersoneria] = React.useState('')
    const [razonSocial, setRazonSocial] = React.useState('')
    const [cuit, setCuit] = React.useState('')
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [facturacion, setFacturacion] = React.useState('')
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [robot, setRobot] = React.useState(false)
    const [tiposDocumentos, setTiposDocumentos] = React.useState([])
    const [tipoDocumento, setTipoDocumento] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [submits, setSubmits] = React.useState(0)
    const [actividades, setActividades] = React.useState([])
    const [actividad, setActividad] = React.useState('')
    const [productoServicio, setProductoServicio] = React.useState([])
    const [tipoSocietario, setTipoSocietario] = React.useState('')
    const [llamadaDocumentos, setLlamadaDocumentos] = React.useState(false)
    const [llamadaActividades, setLlamadaActividades] = React.useState(false)
    const [cantidadMujeres, setCantidadMujeres] = React.useState('')
    const [empleadas, setEmpleadas] = React.useState('')
    const [discapacitados, setDiscapacitados] = React.useState('')
    const [relacion, setRelacion] = React.useState('')

    const tipoDocumentoSelector = useSelector(store => store.tiposDocumentos.tiposDocumentos)
    const resultado = useSelector(store => store.precalificacion.resultado)
    const actividadesSelector = useSelector(store => store.actividadesAFIP.actividades)
    const opcionesDocumentos = [];
    const opcionesActividades = [];

    React.useEffect(async () => {
        if (tipoDocumentoSelector.length > 0 && llamadaDocumentos === true) {
            CompletarOpcionesTipoDocumentos(tipoDocumentoSelector)
        } else if (llamadaDocumentos === false) {
            obtenerTiposDocumentos()
            setLlamadaDocumentos(true)
        }
        if (actividadesSelector.length > 0 && llamadaActividades === true) {
            completarOpcionesActividades(actividadesSelector)
        } else if (llamadaActividades === false) {
            obtenerActividades()
            setLlamadaActividades(true)
        }
        if (resultado !== undefined && submits === 1) {
            if (resultado !== '') {
                cargaExito()
            }
        }
    }, [tipoDocumentoSelector, resultado])

    const obtenerTiposDocumentos = async () => {
        dispatch(obtenerTipoDeDocumentos())
    }

    const obtenerActividades = async () => {
        dispatch(obtenerActividadesAFIP())
    }

    const limpiarResultado = async () => {
        dispatch(limpiarResultado())
    }

    const tipoDocumentoOnChange = (value) => {
        setTipoDocumento(value)
    }

    const productoOnChange = (value) => {
        setProductoServicio(value)
    }

    const actividadOnChange = (value) => {
        setActividad(value)
    }

    const personeriaOnChange = (value) => {
        setPersoneria(value)
    }

    const tipoSocietarioOnChange = (value) => {
        setTipoSocietario(value)
    }

    const tipoRelacionOnChange = (value) => {
        debugger;
        setRelacion(value)
    }

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    const productosServicios = [
        { value: '100000000', label: 'SGR' },
        { value: '100000001', label: 'ALYC' }
    ]

    const personeriaOpciones = [
        { value: '100000000', label: 'Jurídica' },
        { value: '100000001', label: 'Física' }
    ]

    const tiposSocietariosOpciones = [
        { value: '100000000', label: 'S.A.' },
        { value: '100000001', label: 'S.R.L.' },
        { value: '100000002', label: 'Cooperativa' },
        { value: '100000003', label: 'Mutual' },
        { value: '100000004', label: 'Gobierno' },
        { value: '100000005', label: 'S.A.S.' },
        { value: '100000006', label: 'Asociación Civil sin Fines de Lucro' },
        { value: '100000007', label: 'ONG' },
        { value: '100000008', label: 'Fundación' },
        { value: '100000009', label: 'LLC' }
    ]

    const tiposDeRelacionesOpciones = [
        { value: '100000000', label: 'Titular' },
        { value: '100000001', label: 'Accionista' },
        { value: '100000002', label: 'Beneficiario' },
        { value: '100000003', label: 'Miembro del Directorio' },
        { value: '100000004', label: 'Representante Legal/Apoderado' }
    ]

    const CompletarOpcionesTipoDocumentos = (tipos) => {
        tipos.forEach(element => {
            var tipo = { value: element.new_tipodedocumentoid, label: element.new_name }
            opcionesDocumentos.push(tipo);
        });
        setTiposDocumentos(opcionesDocumentos)
    }

    const completarOpcionesActividades = (actividades) => {
        actividades.forEach(act => {
            var actividad = { value: act.new_actividadafipid, label: act.new_name }
            opcionesActividades.push(actividad);
        });
        setActividades(opcionesActividades)
    }

    const ProcesarPrecalificacion = e => {
        e.preventDefault()
        if (personeria === '') {
            document.getElementById("personeria").classList.add("is-invalid");
            setMensaje("La personeria es requerida!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("personeria").classList.remove('is-invalid')
            // document.getElementById("personeria").classList.add("is-valid")
        }
        if (!razonSocial.trim()) {
            document.getElementById("razon").classList.add("is-invalid");
            setMensaje("La razón social es requerida!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("razon").classList.remove('is-invalid')
            // document.getElementById("razon").classList.add("is-valid")
        }
        if (tipoDocumento === '') {
            document.getElementById("tipoDocumento").classList.add("is-invalid");
            setMensaje("El tipo de cocumento es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("tipoDocumento").classList.remove('is-invalid')
            // document.getElementById("nombre-contacto").classList.add("is-valid")
        }
        if (!cuit.trim()) {
            document.getElementById("cuit").classList.add("is-invalid");
            setMensaje("El cuit es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else if (cuit.length > 11 || cuit.length < 11) {
            document.getElementById("cuit").classList.add("is-invalid");
            setMensaje("El cuit es incorrecto!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("cuit").classList.remove('is-invalid')
            // document.getElementById("cuit").classList.add("is-valid")
        }
        if (!nombre.trim()) {
            document.getElementById("contacto").classList.add("is-invalid");
            setMensaje("El nombre de contacto es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("contacto").classList.remove('is-invalid')
            // document.getElementById("price").classList.add("is-valid")
        }
        if (!apellido.trim()) {
            document.getElementById("apellido").classList.add("is-invalid");
            setMensaje("El apellido es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("apellido").classList.remove('is-invalid')
            // document.getElementById("price").classList.add("is-valid")
        }
        if (!telefono.trim()) {
            document.getElementById("tel").classList.add("is-invalid");
            setMensaje("El telefono es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("tel").classList.remove('is-invalid')
        }
        if (!email.trim()) {
            document.getElementById("email").classList.add("is-invalid");
            setMensaje("El email es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("email").classList.remove('is-invalid')
        }
        if (relacion === '') {
            document.getElementById("relacion").classList.add("is-invalid");
            setMensaje("El tipo de relación es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("relacion").classList.remove('is-invalid')
        }
        if (productoServicio === '') {
            document.getElementById("productoServicio").classList.add("is-invalid");
            setMensaje("El servicio a operar es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("productoServicio").classList.remove('is-invalid')
        }
        if (actividad === '') {
            document.getElementById("actividad").classList.add("is-invalid");
            setMensaje("La actividad AFIP es requerida!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("actividad").classList.remove('is-invalid')
        }
        if (tipoSocietario === '') {
            document.getElementById("tipoSocietario").classList.add("is-invalid");
            setMensaje("El tipo societario es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("tipoSocietario").classList.remove('is-invalid')
        }
        if (!facturacion.trim()) {
            document.getElementById("facturacion").classList.add("is-invalid");
            setMensaje("La facturacion es requerida!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("facturacion").classList.remove('is-invalid')
        }
        if (!robot) {
            setMensaje("Debes confirmar que no eres un robot!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        }

        debugger;
        let productos = null
        if (productoServicio.length === 1) {
            productos = productoServicio[0].value
        } else if (productoServicio.length === 2) {
            productos = productoServicio[0].value + ',' + productoServicio[1].value
        }

        dispatch(cargarPrecalificacionCrediticia(personeria, razonSocial.trim(), cuit, tipoDocumento, telefono, email, nombre.trim(), apellido.trim(),
            productos, actividad, tipoSocietario, facturacion, relacion, cantidadMujeres, empleadas, discapacitados))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
        setSubmits(1)
    }

    const cargaExito = () => {
        debugger;
        if (resultado === "EXITO") {
            setMensaje("La precalificación fue enviada con exito!")
            setError(false)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 1500);
            setTimeout(() => {
                history.push("/")
            }, 2000);
            limpiar()
            setSubmits(0)
        }
        else if (resultado === "ERROR") {
            setMensaje("La cuenta que intenta ingresar ya existe!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const limpiar = async () => setTimeout(() => {
        setPersoneria('')
        setRazonSocial('')
        setCuit('')
        setEmail('')
        setTipoDocumento('')
        setTelefono('')
        setNombre('')
    }, 1500)

    const onChange = () => {
        setRobot(true)
    }

    const FormatoMoneda = (value) => {
        var montoUSD = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        })

        debugger;
        var monto = montoUSD.format(value)
        setFacturacion(monto)
    }

    return (
        <animated.div className="container" style={fade}>
            <div className="min-vh-100">
                <div className="card shadow borde-none pad w-100 mt-3 pt-3 pb-3">
                    <div className="row">
                        <div className="col-12 m-0">
                            <span className="separador-titulo-precalificacion float-start m-0"></span>
                            <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">
                                Solicitud de Alta. Los siguientes datos son obligatorios para la solicitud.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card shadow borde-none pad mt-3 mb-5">
                    <div className="row h-25">
                        <div className="col-sm-12 p-4">
                            <div>
                                <form onSubmit={ProcesarPrecalificacion}>
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>Datos Generales</h5>
                                            <div className="p-3">
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">Personeria</label>
                                                        <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                            id="personeria"
                                                            onChange={e => personeriaOnChange(e)}
                                                            value={personeria}
                                                            name="colors"
                                                            options={personeriaOpciones}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            placeholder="Seleccionar..."
                                                        >
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div class="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">Nombre o Razón Social</label>
                                                        <input type="text"
                                                            id="razon"
                                                            name="razon"
                                                            className="form-control"
                                                            onChange={e => setRazonSocial(e.target.value)}
                                                            value={razonSocial}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">Tipo de Documento</label>
                                                        <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                            id="tipoDocumento"
                                                            onChange={e => tipoDocumentoOnChange(e)}
                                                            value={tipoDocumento}
                                                            name="colors"
                                                            options={tiposDocumentos}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            placeholder="Seleccionar..."
                                                        >
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">CUIT</label>
                                                        <input type="text"
                                                            id="cuit"
                                                            name="cuit"
                                                            className="form-control"
                                                            onChange={e => setCuit(e.target.value)}
                                                            value={cuit}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h5>Datos de Contacto</h5>
                                            <div className="p-3">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="mb-2">
                                                            <label className="form-label fw-bolder lbl-precalificacion requerido">Nombre</label>
                                                            <input type="text"
                                                                name="contacto"
                                                                id="contacto"
                                                                className="form-control"
                                                                onChange={e => setNombre(e.target.value)}
                                                                value={nombre}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="mb-2">
                                                            <label className="form-label fw-bolder lbl-precalificacion requerido">Apellido</label>
                                                            <input type="text"
                                                                name="apellido"
                                                                id="apellido"
                                                                className="form-control"
                                                                onChange={e => setApellido(e.target.value)}
                                                                value={apellido}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">Telefono</label>
                                                        <input type="tel"
                                                            id="tel"
                                                            name="tel"
                                                            className="form-control"
                                                            onChange={e => setTelefono(e.target.value)}
                                                            value={telefono}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">Email</label>
                                                        <input type="email"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            onChange={e => setEmail(e.target.value)}
                                                            value={email}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="mb-2">
                                                        <label className="form-label fw-bolder lbl-precalificacion requerido">
                                                            Relación con la Cuenta
                                                        </label>
                                                        <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                            id="relacion"
                                                            onChange={e => tipoRelacionOnChange(e)}
                                                            value={relacion}
                                                            name="relacion"
                                                            options={tiposDeRelacionesOpciones}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            placeholder="Seleccionar..."
                                                        >
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h5>Datos de la Cuenta</h5>
                                            <div className="p-3">
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">
                                                        Servicio a Operar
                                                    </label>
                                                    <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                        id="productoServicio"
                                                        onChange={e => productoOnChange(e)}
                                                        value={productoServicio}
                                                        isMulti
                                                        name="productos"
                                                        options={productosServicios}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Seleccionar..."
                                                    >
                                                    </Select>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">Actividad AFIP</label>
                                                    <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                        id="actividad"
                                                        onChange={e => actividadOnChange(e)}
                                                        value={actividad}
                                                        name="colors"
                                                        options={actividades}
                                                        className="basic-multi-select"
                                                        classNamePrefix="Seleccionar"
                                                        placeholder="Seleccionar..."
                                                    >
                                                    </Select>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">
                                                        Tipo Societario
                                                    </label>
                                                    <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                        id="tipoSocietario"
                                                        onChange={e => tipoSocietarioOnChange(e)}
                                                        value={tipoSocietario}
                                                        name="productos"
                                                        options={tiposSocietariosOpciones}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Seleccionar..."
                                                    >
                                                    </Select>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">Facturación Último Año</label>
                                                    <CurrencyFormat
                                                        name="facturacion"
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                        id="facturacion"
                                                        className="form-control"
                                                        onChange={e => setFacturacion(e.target.value)}
                                                        value={facturacion}
                                                        placeholder="$0.00"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h5>Datos Adicionales</h5>
                                            <div className="p-3">
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Cantidad de Mujeres en Puestos de Toma de Decisión</label>
                                                    <input type="text"
                                                        name="mujerDesicion"
                                                        id="facturacion"
                                                        className="form-control"
                                                        onChange={e => setCantidadMujeres(e.target.value)}
                                                        value={cantidadMujeres}
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Cantidad de Empleados Mujeres</label>
                                                    <input type="text"
                                                        name="empleadas"
                                                        id="empleadas"
                                                        className="form-control"
                                                        onChange={e => setEmpleadas(e.target.value)}
                                                        value={empleadas}
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Cantidad de Personas con Discapacidad</label>
                                                    <input type="text"
                                                        name="discapacitados"
                                                        id="discapacitados"
                                                        className="form-control"
                                                        onChange={e => setDiscapacitados(e.target.value)}
                                                        value={discapacitados}
                                                        placeholder="0"
                                                    />
                                                </div> <div className="mb-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Cantidad de Personas con Discapacidad</label>
                                                    <canvas style={{border: "1px solid grey"}} id="my_canvas" width="300" height="300"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="p-2">
                                                <div className="col-12 col-md-6">
                                                    <ReCAPTCHA
                                                        className=""
                                                        render="explicit"
                                                        sitekey={RecaptchaKey}
                                                        onChange={onChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-12 h-auto mt-2">
                                                    <button type="submit"
                                                        className="btn btn-block btn-lg btn-primary float-start"
                                                    >Enviar</button>
                                                    <div className="col-md-8">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
                    <Toast className="half-black" show={show} autohide color="lime">
                        <Toast.Body className="text-white">
                            <div className="row p-2">
                                {
                                    loading ?
                                        <Spinner animation="border" role="status" variant="primary">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                        :
                                        <div className="col-1 mx-2">
                                            {error ? <FontAwesomeIcon icon={faTimesCircle} className="fs-3 upload-file atras" color="#dc3545" /> : <FontAwesomeIcon icon={faCheckCircle} className="fs-3 upload-file atras" color="#198754" />}
                                        </div>
                                }

                                <div className="col-10 mt-1 ml-5">
                                    {mensaje}
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </div>
            </div>
        </animated.div>
    )
}

export default PrecalificacionCrediticia
