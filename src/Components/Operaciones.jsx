import React from 'react'
import { Toast, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerOperaciones } from '../Redux/Operaciones'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { obtenerDocumentosPorOperacion, cargarDocumentacionPorOperacion } from '../Redux/DocumentacionPorOperacion'
import { obtenerDocumentos } from '../Redux/Documentacion'
import { COLUMNS } from '../Tables/OperacionesColumns'
import Tabla from '../Components/Tabla'
import { useSpring, animated } from 'react-spring'

const Operaciones = () => {
    //Constantes
    const dispatch = useDispatch()
    const [operaciones, setOperaciones] = React.useState([])
    const [documentosXOperacion, setDocumentosXOperacion] = React.useState([])
    const [documentos, setDocumentos] = React.useState([])
    const [nombreDocumento, setNombreDocumento] = React.useState('')
    const [operacion, setOperacion] = React.useState('')
    const [documento, setDocumento] = React.useState('')
    const [fecha, setFecha] = React.useState('')
    const [firmaDigital, setFirmaDigital] = React.useState(true)
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [nombreOP, setNombreOP] = React.useState('')
    const [columnasOperaciones, setColumnasOperaciones] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [llamadaDocO, setLlamadaDocO] = React.useState(false)
    const [llamadaDocumentos, setLlamadaDocumentos] = React.useState(false)
    const [llamadaOperaciones, setLlamadaOperaciones] = React.useState(false)
    const [registros, setRegistros] = React.useState()

    //Estados  
    const documentosSelector = useSelector(store => store.documentos.documentos)
    const documentosPorOperacionSelector = useSelector(store => store.documentosOperacion.documentos)
    const resultadoOperacionSelector = useSelector(store => store.documentosOperacion.resultadoOperacion)
    const operacionesSelector = useSelector(store => store.operaciones.operaciones)
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const operacionIdSelector = useSelector(store => store.operaciones.operacionIdSeleccionada)


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
            if (operacionesSelector.length > 0) {
                setOperaciones(operacionesSelector)
                setColumnasOperaciones(COLUMNS)
                if (document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
            } else if (llamadaOperaciones === false) {
                const resp = await obtenerOperacion()
                setLlamadaOperaciones(true)
                setTimeout(() => {
                    if (document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                    setRegistros("No se encontraron registros")
                }, 3000);
            }
            if (documentosPorOperacionSelector.length > 0) {
                setDocumentosXOperacion(documentosPorOperacionSelector)
            } else if (llamadaDocO === false) {
                const respDO = await obtenerDocOperacion()
                setLlamadaDocO(true)
            }
            if (documentosSelector.length > 0) {
                setDocumentos(documentosSelector)
            } else if (llamadaDocumentos === false) {
                const respDocs = await obtenerDoc()
                setLlamadaDocumentos(true)
            }
            if (operacionIdSelector !== ' ') {
                obtenerOperacionId(operacionIdSelector)
            }
            if (resultadoOperacionSelector !== undefined) {
                if (resultadoOperacionSelector !== '') {
                    cargaExito()
                }
            }
        }
    }, [activo, operacionesSelector, documentosPorOperacionSelector, documentosSelector, operacionIdSelector])

    const obtenerOperacion = async () => {
        dispatch(obtenerOperaciones(accountid))
    }

    const obtenerDocOperacion = async () => {
        dispatch(obtenerDocumentosPorOperacion(accountid))
    }

    const obtenerDoc = async () => {
        dispatch(obtenerDocumentos())
    }

    const obtenerOperacionId = async (id) => {
        setOperacion(id)
        operaciones.filter((op) => op.new_operacionid === id).map(item => {
            setNombreOP(item.new_name)
        })
    }

    const obtenerDocumentoXoperacion = async (e) => {
        setDocumento(e)
        documentos.filter((doc) => doc.new_documentacionid === e).map(item => {
            setNombreDocumento(item.new_name)
        })
    }

    const ProcesarDocumentoOperacion = async (e) => {
        e.preventDefault()
        const firma = document.getElementById("flexSwitchCheckChecked")
        document.getElementById("nombre").classList.add("is-valid");
        document.getElementById("nombre").classList.remove('is-invalid');

        if (!documento.trim()) {
            document.getElementById("documento").classList.add("is-invalid");
            setMensaje("El documento es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 1500);
            return;
        } else {
            debugger;
            document.getElementById("documento").classList.remove('is-invalid')
            document.getElementById("documento").classList.add("is-valid")
        }

        if (!fecha.trim()) {
            document.getElementById("fecha").classList.add("is-invalid");
            setMensaje("La fecha es requerida!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 1500);
            return;
        } else {
            document.getElementById("fecha").classList.remove('is-invalid')
            document.getElementById("fecha").classList.add("is-valid");
        }
        if (firma.checked === true) {
            setFirmaDigital(true)
        } else {
            setFirmaDigital(false)
        }
        if (!operacion.trim()) {
            setMensaje("La operación es requerida!")
            setError(true)
            setShow(true)
            return;
        }
        const nombreOpDoc = nombreDocumento + ' - ' + nombreOP;

        const respuesta = dispatch(cargarDocumentacionPorOperacion(nombreOpDoc, operacion, documento, fecha, firmaDigital))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const cargaExito = () => {
        if (resultadoOperacionSelector === "EXITO") {
            setMensaje("La operación fue enviada con exito!")
            setError(false)
            setLoading(false)
            setShow(true)
            obtenerDocOperacion()
            setTimeout(() => {
                setShow(false)
            }, 1500);
            limpiar()
        }
        else if (resultadoOperacionSelector === "ERROR") {
            setMensaje("Error en la operación!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const limpiar = async () => setTimeout(() => {
        const firma = document.getElementById("flexSwitchCheckChecked")
        document.getElementById("nombre").classList.remove('is-valid')
        document.getElementById("documento").classList.remove('is-valid')
        document.getElementById("fecha").classList.remove('is-valid')
        setFecha('')
        setDocumento('')
        // setOperacion('')
        setFirmaDigital(false)
        firma.checked = false;
    }, 1500)

    const razonParaElEstado = (estado) => {
        var estadoOperacion;
        switch (estado) {
            case '1':
                estadoOperacion = 'Pendiente'
                break;
            case '100000000':
                estadoOperacion = 'Recibido'
                break;
            case '100000001':
                estadoOperacion = 'Aprobado'
                break;
            default:
                estadoOperacion = 'Pendiente'
                break;
        }
        return estadoOperacion;
    }

    return (
        <animated.div className="container mt-5" style={fade}>
            <div className="w-100 vh-100">
                <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                    <div className="contenedor-spinner" id="spinner1">
                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    {operaciones.length > 0 ? (<Tabla lineas={operaciones} columnas={columnasOperaciones} titulo={'Operaciones'} />) : <p className="color-textp-lista fw-bolder m-0">{registros}</p>}
                </div>
            </div>
            <div className="modal fade bd-example-modal-xl" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content contenedor-modal">
                        <div className="modal-body">
                            <div className="mb-3 h-auto">
                                <div className="row">
                                    <div>
                                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" id="myInput"></button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-10">
                                                <div className="card shadow p-4 border-0 h-auto d-flex pad mt-2">
                                                    <div className="row justify-content-center">
                                                        <div className="">
                                                            <div className="col-sm-10">
                                                                <h6 className="fw-bolder">Documentación por Operación</h6>
                                                            </div>
                                                            <hr className="hr-width hr-principal" />
                                                            <div className="card pad color-header borde-none">
                                                                <div className="lista-header color-header pad">
                                                                    <div className="row p-3">
                                                                        <div className="col-sm-8">
                                                                            Operación
                                                                        </div>
                                                                        <div className="col-sm-4 text-end">
                                                                            Estado
                                                                        </div>
                                                                    </div>
                                                                    <ul className="list-group w-100 h-auto overflow-auto lista-body shadow-sm">
                                                                        {
                                                                            documentosXOperacion.filter((docXop) => docXop._new_operacion_value === operacion).map(item => {
                                                                                return (
                                                                                    <li key={item.new_documentacionporoperacionid} className="list-group-item borde-0">
                                                                                        <div className="row d-flex align-items-center pt-2 pb-2">
                                                                                            <div className="col-9 m-0 p-0 text-start">
                                                                                                <div className="row align-items-center">
                                                                                                    <div className="col-sm-8">
                                                                                                        <p className="text-lowercase m-0 fw-bolder color-textp-lista texto-lista" >{item.new_name}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-3 m-0 text-end">
                                                                                                <p className="text-lowercase m-0 fw-bolder color-textp-lista texto-lista">{razonParaElEstado(item.statuscode)}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                                <div className="row p-3">
                                                                    <div className="col-sm-12  text-center c-azul fw-bolder">
                                                                        {documentosXOperacion.filter((docXop) => docXop._new_operacion_value === operacion).length} Documentos
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row justify-content-center">
                                            <div className="col-sm-10">
                                                <div className="card shadow p-4 border-0 h-auto d-flex justify-content-start pad mt-2">
                                                    <div className="mt-0">
                                                        <h6 className="fw-bolder">Cargar Documentacion</h6>
                                                        <hr className="hr-width hr-principal" />
                                                    </div>
                                                    <div className="card doc-cards pad p-4 color-header borde-none">
                                                        <div className="lista-header color-header pad">
                                                            <form onSubmit={ProcesarDocumentoOperacion}>
                                                                <div class="mb-3">
                                                                    <label for="exampleInputPassword1" class="form-label ">Operación</label>
                                                                    <input
                                                                        type="text"
                                                                        class="form-control form-control-lg"
                                                                        id="nombre"
                                                                        // onChange={e => setNombre(e.target.value)}
                                                                        value={nombreOP}
                                                                    />
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="exampleInputPassword1" class="form-label">Documentación</label>
                                                                    <select className="form-select form-select-lg mb-3"
                                                                        aria-label=".form-select-lg example"
                                                                        // onChange={e => setDocumento(e.target.value)}
                                                                        onChange={e => obtenerDocumentoXoperacion(e.target.value)}
                                                                        value={documento}
                                                                        id="documento"
                                                                    >
                                                                        <option selected>Seleccionar documento</option>
                                                                        {
                                                                            documentos.map(carpeta => {
                                                                                return (
                                                                                    <option
                                                                                        className="subtitulo-select p-4 fw-bolder"
                                                                                        data-id={carpeta.new_documentacionid}
                                                                                        value={carpeta.new_documentacionid}>
                                                                                        {carpeta.new_name}
                                                                                    </option>
                                                                                )
                                                                            }) //pendiente vencido parcial P100.000.001, V100.000.004, p100.000.000
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <label for="exampleInputPassword1" class="form-label">Fecha de Vencimiento</label>
                                                                    <input type="date"
                                                                        class="form-control form-control-lg"
                                                                        id="fecha"
                                                                        onChange={e => setFecha(e.target.value)}
                                                                        value={fecha}
                                                                    />
                                                                </div>
                                                                <div class="form-check form-switch">
                                                                    <input class="form-check-input switch-custom"
                                                                        type="checkbox"
                                                                        id="flexSwitchCheckChecked"
                                                                    //    onChange={e => setFirmaDigital(e.target.value)}
                                                                    />
                                                                    <label class="form-check-label" for="flexSwitchCheckChecked">Firma Digital</label>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-lg text-center btn-primary mt-4"
                                                                    onClick={ProcesarDocumentoOperacion}
                                                                >Enviar</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 position-fixed bottom-0 end-0 p-5 noti">
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
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default Operaciones
