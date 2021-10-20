import React from 'react'
import Moment from 'moment'
import perfiRandom from '../img/foto-perfil-random.png'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerCertificadoPyme, obtenerSociedadesXsocio, obtenerSociedadeDeBolsa, obtenerProvincias, actualizarDatosCuenta, actualizarDatosAlyc, obtenerSocios } from '../Redux/Cuenta'
import { obtenerBancos, obtenerBancosXsocio, CrearCuentaXsocio } from '../Redux/CuentasBancarias'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { Toast, Spinner } from 'react-bootstrap'
import Select from 'react-select';
import CurrencyFormat from 'react-currency-format';

const Cuenta = () => {
    //Constantes
    const dispatch = useDispatch()
    const [cuenta, setCuenta] = React.useState(null)
    const [certificados, setCertificados] = React.useState([])
    const [sociedadXbolsa, setSociedadXbolsa] = React.useState({})
    const [nombreSociedad, setNombreSociedad] = React.useState('')
    const [nombreCuentaComitente, setNombreCuentaComitente] = React.useState('')
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [localidad, setLocalidad] = React.useState('')
    const [calle, setCalle] = React.useState('')
    const [codigoPostal, setCodigoPostal] = React.useState('')
    const [numero, setNumero] = React.useState('')
    const [piso, setPiso] = React.useState('')
    const [depto, setDepto] = React.useState('')
    const [provincia, setProvincia] = React.useState('')
    const [provincias, setProvincias] = React.useState([])
    const [municipio, setMunicipio] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [bancos, setBancos] = React.useState([])
    const [bancosXSocio, setBancosXsocio] = React.useState([])
    const [bancoid, setBancoid] = React.useState('')
    const [socioid, setSocioid] = React.useState('')
    const [cbu, setCbu] = React.useState('')
    const [nroCuenta, setNroCuenta] = React.useState('')
    const opcionesProvincias = [];
    const opcionesBancos = []
    const [bancosOpciones, setBancosOpciones] = React.useState([])
    const [sociosOpciones, setSociosOpciones] = React.useState([])
    //Alyc
    const [estadoSocio, setEstadoSocio] = React.useState('')
    const [actividadEsperada, setActividadEsperada] = React.useState('')
    const [actividadValor, setActividadValor] = React.useState('')
    const [operaPorCuenta, setOperaPorCuenta] = React.useState('')
    const [montoEstimado, setMontoEstimado] = React.useState('')
    const [proposito, setProposito] = React.useState([])
    const [otros, setOtros] = React.useState('')
    const [metodoEmision, setMetodoEmision] = React.useState('')
    const [fechaContrato, setFechaContrato] = React.useState('')
    const [fechaInscripcion, setFechaInscripcion] = React.useState('')
    const [numeroInscripcion, setNumeroInscripcion] = React.useState('')
    //Llamadas Api
    const [llamadaSociedad, setLlamadaSociedad] = React.useState(false)
    const [llamadaSociedadXbolsa, setLlamadaSociedadXbolsa] = React.useState(false)
    const [llamadaCertificados, setLlamadaCertificados] = React.useState(false)
    const [llamadaProvincias, setLlamadaProvincias] = React.useState(false)
    const [llamadaBancos, setLlamadaBancos] = React.useState(false)
    const [llamadaBancosXsocio, setLlamadaBancosXsocio] = React.useState(false)
    const [llamadaSocios, setLlamadaSocios] = React.useState(false)
    const [seteoSocideda, setSeteoSociedad] = React.useState(false)
    const [datosCompletados, setDatosCompletados] = React.useState(false)
    //Estados
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const cuentaSelector = useSelector(store => store.cuenta.cuenta)
    const certificadosSelector = useSelector(store => store.cuenta.certificadosPymes)
    const sociedadesXsocioSelector = useSelector(store => store.cuenta.sociedadXsocio)
    const sociedadDebolsa = useSelector(store => store.cuenta.sociedadDeBolsa)
    const provinciasSelector = useSelector(store => store.cuenta.provincias)
    const actualizacionDatosSelector = useSelector(store => store.cuenta.actualizacionDatos)
    const actualizacionDatosAlycSelector = useSelector(store => store.cuenta.actualizacionDatosAlyc)
    const bancosSelector = useSelector(store => store.bancos.Bancos)
    const bancosXsocioSelector = useSelector(store => store.bancos.BancosPorSocios)
    const crarBancoSelector = useSelector(store => store.bancos.crearCuenta)
    const sociosSelector = useSelector(store => store.cuenta.socios)

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
            if (Object.keys(cuentaSelector).length != 0 && datosCompletados === false) {
                setCuenta(cuentaSelector)
            }

            if (datosCompletados === false && Object.keys(cuentaSelector).length > 0) {
                completarDatos(cuentaSelector)
                setDatosCompletados(true)
            }

            if (Object.keys(sociedadesXsocioSelector).length != 0 && llamadaSociedad === true) {
                setSociedadXbolsa(sociedadesXsocioSelector)
            } else if (llamadaSociedad === false) {
                obtenerSociedadXbolsa()
                setLlamadaSociedad(true)
            }

            if (certificadosSelector.length > 0 && llamadaCertificados === true) {
                setCertificados(certificadosSelector)
                document.getElementById("spinner1").style.display = "none"
            } else if (llamadaCertificados === false) {
                obtenerTodosCertificadosPymes()
                setLlamadaCertificados(true)
                setTimeout(() => {
                    if (document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                }, 3000);
            }

            if (Object.keys(sociedadDebolsa).length === 0 && llamadaSociedadXbolsa === false) {
                if (Object.keys(sociedadXbolsa).length > 0) {
                    obtenerSociedadDeBolsa(sociedadXbolsa[0]._new_sociedaddebolsa_value)
                    setLlamadaSociedadXbolsa(true)
                    if (document.getElementById("spinner2") !== null) {
                        document.getElementById("spinner2").hidden = true;
                    }
                }
            } else if (Object.keys(sociedadDebolsa).length > 0 && llamadaSociedadXbolsa === true) {
                setNombreCuentaComitente(sociedadXbolsa[0].new_cuentacomitente)
                if (document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
            }

            if (sociedadDebolsa.length > 0 && seteoSocideda === false) {
                setNombreSociedad(sociedadDebolsa[0].new_name)
                setSeteoSociedad(true)
                if (document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
            }

            if (provinciasSelector.length > 0 && llamadaProvincias === true && cuenta != undefined) {
                setProvincias(provinciasSelector)
                // completarOpcionesProvincias(provinciasSelector)
                completarProvincias(provinciasSelector, cuenta)
            } else if (provinciasSelector.length === 0 && llamadaProvincias === false) {
                setLlamadaProvincias(true)
                obtenerTodasProvincias()
            }

            if (bancosSelector.length > 0 && llamadaBancos === true) {
                setBancos(bancosSelector)
                completarOpcionesBancos(bancosSelector)
            } else if (llamadaBancos === false) {
                setLlamadaBancos(true)
                obtenerTodoBancos()
            }

            if (bancosXsocioSelector.length > 0 && llamadaBancosXsocio === true) {
                setBancosXsocio(bancosXsocioSelector)
                if (document.getElementById("spinner3") !== null) {
                    document.getElementById("spinner3").hidden = true;
                }

            } else if (llamadaBancosXsocio === false) {
                setLlamadaBancosXsocio(true)
                obtenerTodosBancosXsocio()
            }

            // if (sociosSelector.length > 0 && llamadaSocios === true) {
            //     debugger;
            //     completarOpcionesSocios(sociosSelector)
            // }else if(sociosSelector.length === 0 && llamadaSocios === false){
            //     obtenerTodosSocios()
            //     setLlamadaSocios(true)
            // }

            if (actualizacionDatosSelector !== undefined) {
                if (actualizacionDatosSelector !== '') {
                    actualizacionExito(actualizacionDatosSelector)
                }
            }

            if (actualizacionDatosAlycSelector !== undefined) {
                if (actualizacionDatosAlycSelector !== '') {
                    actualizacionExito(actualizacionDatosAlycSelector)
                }
            }

            if(crarBancoSelector !== undefined){
                if (crarBancoSelector !== '') {
                    creacionExito(crarBancoSelector)
                }
            }
        }
    }, [activo, cuentaSelector, provinciasSelector, sociedadXbolsa, actualizacionDatosSelector, bancosSelector, bancosXsocioSelector, actualizacionDatosAlycSelector, sociedadDebolsa, crarBancoSelector, sociosSelector])

    const obtenerTodosCertificadosPymes = async () => {
        dispatch(obtenerCertificadoPyme(accountid))
    }

    const obtenerSociedadXbolsa = async () => {
        dispatch(obtenerSociedadesXsocio(accountid))
    }

    const obtenerSociedadDeBolsa = async (socioId) => {
        dispatch(obtenerSociedadeDeBolsa(socioId))
    }

    const obtenerTodasProvincias = async () => {
        dispatch(obtenerProvincias())
    }

    const obtenerTodoBancos = async () => {
        dispatch(obtenerBancos())
    }

    const obtenerTodosBancosXsocio = async () => {
        dispatch(obtenerBancosXsocio(accountid))
    }

    const obtenerTodosSocios = async () => {
        dispatch(obtenerSocios())
    }


    const completarDatos = (cuentas) => {
        if (cuentas != undefined) {
            //General
            setCuenta(cuentas)
            setCalle(cuentas.address1_line1)
            setNumero(cuentas.new_direccion1numero)
            setPiso(cuentas.address1_name)
            setDepto(cuentas.new_direccion1depto)
            setLocalidad(cuentas.new_localidad)
            setMunicipio(cuentas.address1_county)
            setCodigoPostal(cuentas.address1_postalcode)
            setTelefono(cuentas.telephone2)
            //Alyc
            ArmarEstadoSocio(cuentas.new_estadodelsociocalyc)
            ArmarActividad(cuentas.new_actividadesperadadelacuenta)
            ArmarOpera(cuentas.new_operaporcuentapropia)
            setMontoEstimado(cuentas.new_montoestimadoainvertir)
            ArmarProposito(cuentas.new_propsitodelacuenta)
            setOtros(cuentas.new_otros)
            ArmarMetodo(cuentas.new_mtododeemisin)
            var fecha = cuentas.new_fechacontratosocial.split('T')
            setFechaContrato(fecha[0])
            setFechaInscripcion(cuentas.new_fechaddeinscripcinregistral)
            setNumeroInscripcion(cuentas.new_numerodeinscripcinregistral)

            provincias.filter(prov => prov.new_provinciaid === cuentas._new_provincia_value).map(item => {
                setProvincia(item.new_provinciaid)
            })
        }
    }

    const completarProvincias = (provinciasS, cuenta) => {
        provinciasS.filter(prov => prov.new_provinciaid === cuenta._new_provincia_value).map(item => {
            setProvincia(item.new_provinciaid)
        })
    }

    const actualizarDatos = (e) => {
        e.preventDefault()
        if (localidad !== null) {
            if (!localidad.trim()) {
                setLocalidad(localidad)
            }
        }
        dispatch(actualizarDatosCuenta(accountid, telefono, calle, numero, piso, depto, provincia, localidad, municipio, codigoPostal))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const completarOpcionesProvincias = (provincias) => {
        provincias.forEach(prov => {
            var provincia = { value: prov.new_provinciaid, label: prov.new_name }
            opcionesProvincias.push(provincia);
        });
        setProvincias(opcionesProvincias)
    }

    const completarOpcionesBancos = (bancos) => {
        const opcionesBancos = []
        bancos.forEach(item => {
            var banco = { value: item.new_bancoid, label: item.new_name }
            opcionesBancos.push(banco);
        });
        setBancosOpciones(opcionesBancos)
    }

    const completarOpcionesSocios = (socios) => {
        const opcionesSocio = []
        socios.forEach(item => {
            var socio = { value: item.Accountid, label: item.Name }
            opcionesSocio.push(socio);
        });
        setSociosOpciones(opcionesSocio)
    }

    const armarOpcionMultiple = (arrayOpciones = []) => {
        let opcion = null

        if (arrayOpciones.length >= 1) {
            arrayOpciones.forEach(element => {
                if (opcion === null) {
                    opcion = element.value;
                } else {
                    opcion = opcion + ',' + element.value
                }
            });
        }

        return opcion
    }

    const actualizarDatosInfoAlyc = (e) => {
        e.preventDefault()
        let actividad = null
        let propositoCuenta = null

        if (actividadEsperada.length > 0) {
            actividad = armarOpcionMultiple(actividadEsperada)
        }
        if (proposito.length > 0) {
            propositoCuenta = armarOpcionMultiple(proposito)
        }

        dispatch(actualizarDatosAlyc(accountid, estadoSocio, actividad, operaPorCuenta, montoEstimado, propositoCuenta, otros, metodoEmision,
            fechaContrato, fechaInscripcion, numeroInscripcion))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const crearCuentaxSocio = (e) => {
        e.preventDefault()
        if (bancoid === '') {
            // document.getElementById("productoServicio").classList.add("is-invalid");
            setMensaje("El banco es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            // document.getElementById("productoServicio").classList.remove('is-invalid')
        }
        debugger;
        dispatch(CrearCuentaXsocio(accountid, bancoid, cbu, nroCuenta))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const creacionExito = (resultadoCreacion) => {
        if (resultadoCreacion === 'EXITO') {
            setMensaje("Cuenta creada con exito!")
            setError(false)
            setLoading(false)
            setShow(true)
            obtenerTodosBancosXsocio()
            setTimeout(() => {
                setShow(false)
            }, 1500);
            setTimeout(() => {
                document.getElementById("myInput").click();
            }, 2000);
        } else if (resultadoCreacion === 'ERROR') {
            setMensaje("La cuenta no se pudo crear!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }


    const actualizacionExito = (resultadoActualizacion) => {
        if (resultadoActualizacion === 'EXITO') {
            setMensaje("Datos actualizados con exito!")
            setError(false)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 1500);
            setTimeout(() => {
                document.getElementById("myInput").click();
            }, 2000);
        } else if (resultadoActualizacion === 'ERROR') {
            setMensaje("Los datos no se actualizaron!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const EstadoDelSocioOpciones = [
        { value: '100000000', label: 'Inicial' },
        { value: '100000001', label: 'Aprobado para Enviar a Legacy' },
        { value: '100000002', label: 'Enviado a Legacy' }
    ]

    const ActividadesEsperadasOpciones = [
        { value: '100000000', label: 'Compra-Venta de Títulos Públicos' },
        { value: '100000001', label: 'Compra-Venta de Acciones Caución' },
        { value: '100000002', label: 'Colocadora/Tomadora' },
        { value: '100000003', label: 'Opciones' },
        { value: '100000004', label: 'Futuros' },
        { value: '100000005', label: 'FCI-FF' },
        { value: '100000006', label: 'Otros' }
    ]

    const OperaOpciones = [
        { value: 'false', label: 'No' },
        { value: 'true', label: 'Si' }
    ]

    const PropositoOpciones = [
        { value: '100000000', label: 'Inversión' },
        { value: '100000001', label: 'Ahorro' },
        { value: '100000002', label: 'Financiamiento' }
    ]

    const MetodosEmisionesOpciones = [
        { value: '100000000', label: 'Teléfono' },
        { value: '100000001', label: 'Presencial' },
        { value: '100000002', label: 'E-mail' },
        { value: '100000003', label: 'Online' }
    ]

    const esatdoSocioOnChange = (value) => {
        setEstadoSocio(value)
    }

    const actividadEsperadaOnChange = (value) => {
        setActividadEsperada(value)
        setActividadValor(value.value)
    }

    const operaOnChange = (value) => {
        setOperaPorCuenta(value)
    }

    const propositoOnChange = (value) => {
        setProposito(value)
    }

    const metodoEmisionOnChange = (value) => {
        setMetodoEmision(value)
    }

    const bancoOnChange = (value) => {
        setBancoid(value)
    }

    const socioOnChange = (value) => {
        setSocioid(value)
    }

    const provinciaOnChange = (value) => {
        setProvincia(value)
    }

    const obtenerRazonParaElEstado = (razon) => {
        switch (razon) {
            case "1":
                return "Aprobado"
            case "100000000":
                return "Analisis"
            case "100000001":
                return "Inicio"
            case "100000002":
                return "Reprobado"
            default:
                return "Analisis"
        }
    }

    const obtenerValorEstadoDelSocio = (estado) => {
        switch (estado) {
            case "100000000":
                return "Inicial"
            case "100000001":
                return "Aprobado para Enviar a Legacy"
            case "100000002":
                return "Enviado a Legacy"
        }
    }

    const obtenerValorMetodoEmision = (metodo) => {
        switch (metodo) {
            case "100000000":
                return "Teléfono"
            case "100000001":
                return "Presencial"
            case "100000002":
                return "E-mail"
            case "100000003":
                return "Online"
        }
    }

    const obtenerValorPropostio = (valor) => {
        switch (valor) {
            case '100000000':
                return 'Inversión'
            case '100000001':
                return 'Ahorro'
            case '100000002':
                return 'Financiamiento'
        }
    }

    const obtenerValorActividad = (valor) => {
        switch (valor) {
            case "100000000":
                return "Compra-Venta de Títulos Públicos"
            case "100000001":
                return "Compra-Venta de Acciones Caución"
            case "100000002":
                return "Colocadora/Tomadora"
            case "100000003":
                return "Opciones"
            case "100000004":
                return "Futuros"
            case "100000005":
                return "FCI-FF"
            case "100000006":
                return "Otros"
        }
    }

    const obtenerValorOpera = (valor) => {
        switch (valor) {
            case "false":
                return "No"
            case "true":
                return "Si"
        }
    }

    const obtenerActividadEsperada = (actividades) => {
        var actividad = ''
        var actividadAux = ''

        if (actividades.length > 0) {
            for (let index = 0; index < actividades.length; index++) {
                const element = actividades[index]
                actividadAux = obtenerValorActividad(element.value)
                if (actividad === '') {
                    actividad = actividadAux
                } else {
                    actividad = actividad + ',' + actividadAux
                }
            }
        }

        return actividad
    }

    const ArmarProposito = (valor) => {
        if (valor !== null) {
            var opcionesProposito = []

            if (valor.includes(',')) {
                var valores = valor.split(',')
                valores.forEach(pro => {
                    var proposito = { value: pro, label: obtenerValorPropostio(pro) }
                    opcionesProposito.push(proposito);
                });
            } else {
                var proposito = { value: valor, label: obtenerValorPropostio(valor) }
                opcionesProposito.push(proposito);
            }

            setProposito(opcionesProposito)
        }
    }

    const ArmarActividad = (valor) => {
        if (valor !== null) {
            var opcionesActividad = []

            if (valor.includes(',')) {
                var valores = valor.split(',')
                valores.forEach(act => {
                    var actividad = { value: act, label: obtenerValorActividad(act) }
                    opcionesActividad.push(actividad);
                });
            } else {
                var actividad = { value: valor, label: obtenerValorActividad(valor) }
                opcionesActividad.push(proposito);
            }

            setActividadEsperada(opcionesActividad)
        }
    }

    const ArmarEstadoSocio = (valor) => {
        if (valor !== null) {
            var opcionesEstados = []
            var estado = { value: valor, label: obtenerValorEstadoDelSocio(valor) }
            opcionesEstados.push(estado)
            setEstadoSocio(opcionesEstados)
        }
    }

    const ArmarMetodo = (valor) => {
        if (valor !== null) {
            var opcionesMetodos = []
            var metodo = { value: valor, label: obtenerValorMetodoEmision(valor) }
            opcionesMetodos.push(metodo)
            setMetodoEmision(opcionesMetodos)
        }
    }

    const ArmarOpera = (valor) => {
        if (valor !== null) {
            var opcionesOpera = []
            var opera = { value: valor, label: obtenerValorOpera(valor) }
            opcionesOpera.push(opera)
            setOperaPorCuenta(opcionesOpera)
        }
    }

    const obtenerEstadoDelSocio = (valor) => {
        if (Array.isArray(valor)) {
            return obtenerValorEstadoDelSocio(valor[0].value)
        } else {
            return obtenerValorEstadoDelSocio(valor.value)
        }
    }

    const obtenerMetodoEmision = (valor) => {
        if (Array.isArray(valor)) {
            return obtenerValorMetodoEmision(valor[0].value)
        } else {
            return obtenerValorMetodoEmision(valor.value)
        }
    }

    const obtenerOpera = (valor) => {
        if (Array.isArray(valor)) {
            return obtenerValorOpera(valor[0].value)
        } else {
            return obtenerValorOpera(valor.value)
        }
    }

    const obtenerPropositoDeLaCuenta = (propositos) => {
        var proposito = '';
        var propositoAux;

        if (propositos.length > 0) {
            for (let index = 0; index < propositos.length; index++) {
                const element = propositos[index];
                propositoAux = obtenerValorPropostio(element.value)
                if (proposito === '') {
                    proposito = propositoAux
                } else {
                    proposito = proposito + ',' + propositoAux
                }
            }
        }

        return proposito
    }

    const obtenerBanco = (bancoid) => {
        var nombreBanco;
        bancos.filter((banco) => banco.new_bancoid == bancoid).map(item => {
            nombreBanco = item.new_name
        })
        return nombreBanco
    }

    return (
        <animated.div className="container min-vh-100" style={fade}>
            <div className="row mt-5 mb-5">
                <div className="col-12 col-md-4 col-lg-4 mb-3">
                    <div className="card shadow p-0 border-0 h-auto d-flex justify-content-start pad">
                        <div className="row p-2">
                            <div className="col-6">
                                <div>
                                    <h6 className="fw-bolder">Información General</h6>
                                    <hr className="hr-width hr-principal" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="dropdown float-end">
                                    <button className="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faEllipsisH} className="fs-5 text-dark upload-file atras float-end" />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <button className="btn border-0 adeltante dropdown-item text-light"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Cambiar foto de Perfil
                                            </button>
                                        </li>
                                        <li>
                                            <button className="btn border-0 adeltante dropdown-item text-light"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Editar información
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row w-100 justify-content-center">
                            <div className="col-12 ">
                                <div className="w-100 d-flex justify-content-center">
                                    <img className="border-secondary padding-foto-perfil p-1 foto-mi-perfil rounded-circle"
                                        src={perfiRandom} alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="row w-auto d-flex justify-content-center">
                                    <div className="col-12 ">
                                        <div className="w-100 p-2 text-center">
                                            <p className="fw-bolder">{cuenta != undefined ? cuenta.Name : '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-start">
                                            <p className="m-0">CUIT</p>
                                            <p className="fw-bolder">{cuenta != undefined != 0 ? cuenta.new_nmerodedocumento : '---'}</p>
                                        </div >
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-center">
                                            <p className="m-0">Telefono</p>
                                            <p className="fw-bolder">{telefono != '' != 0 ? telefono : '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-end">
                                            <p className="m-0">Ciudad</p>
                                            <p className="fw-bolder">{localidad != '' != 0 ? localidad : '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-start">
                                            <p className="m-0">Direccion</p>
                                            <p className="fw-bolder">{calle != '' ? calle : '---'} {numero != '' ? numero : '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-center">
                                            <p className="m-0">Piso</p>
                                            <p className="fw-bolder">{piso != '' != 0 ? piso : '---'}</p>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="w-100  p-2 text-end">
                                            <p className="m-0">Depto</p>
                                            <p className="fw-bolder">{depto != '' != 0 ? depto : '---'}</p>
                                        </div>
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

export default Cuenta


