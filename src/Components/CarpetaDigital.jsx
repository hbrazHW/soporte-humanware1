import React from 'react'
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDocumentosPorCuenta, cargarDocumentacionPorCuenta } from '../Redux/CarpetaDigital'
import { faEllipsisH, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast, Spinner } from 'react-bootstrap'
import { useSpring, animated } from 'react-spring'
import { Link } from "react-router-dom";

export const CarpetaDigital = () => {
    //Constantes
    const dispatch = useDispatch()
    const [carpetas, setCarpetas] = React.useState([])
    const [documentoId, setDocumentoId] = React.useState('')
    const [documento, setDocumento] = React.useState('')
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState();
    const [selectedFiles, setSelectedFiles] = React.useState([])
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    //Estados
    const documentosSelector = useSelector(store => store.documentosPorCuenta.documentos)
    const cargaDocumento = useSelector(store => store.documentosPorCuenta.cargaDocumento)
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)

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
            if (documentosSelector.length > 0) {
                setCarpetas(documentosSelector)
                if (document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
                if (document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
            } else {
                obtenerDocumentos()
            }

            if (cargaDocumento !== undefined) {
                if (cargaDocumento !== '') {
                    subidaExito()
                }
            }
        }
    }, [activo, documentosSelector, cargaDocumento])

    const obtenerDocumentos = async () => {
        dispatch(obtenerDocumentosPorCuenta(accountid))
    }

    const obtenerDocumento = async (e) => {
        setDocumentoId(e)
        carpetas.filter(elemento => elemento.new_documentacionporcuentaid === e).map(item => {
            setDocumento(item.new_name)
        })
    }

    const changeHandler = (event) => {
        setSelectedFiles(event.target.files)
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = (e) => {
        e.preventDefault()

        if (documentoId === '') {
            document.getElementById("nombreDoc").classList.add('is-invalid')
            setMensaje("El documento es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("nombreDoc").classList.remove('is-invalid')
            document.getElementById("nombreDoc").classList.add("is-valid")
        }
        if (selectedFiles.length === 0) {
            document.getElementById("adjunto").classList.add('is-invalid')
            setMensaje("El archivo adjunto es requerido!")
            setError(true)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            return
        } else {
            document.getElementById("adjunto").classList.remove('is-invalid')
            document.getElementById("adjunto").classList.add("is-valid")
        }

        const formData = new FormData();
        for (let index = 0; index < selectedFiles.length; index++) {
            let element = selectedFiles[index];
            formData.append(`body${index}`, element);
        }
        // formData.append('body', selectedFiles);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        debugger;
        const respuesta = dispatch(cargarDocumentacionPorCuenta(formData, config, documentoId, documento))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    };

    const subidaExito = () => {
        debugger;
        if (cargaDocumento === 'EXITO') {
            setMensaje("La carga del archivo fue exitosa!")
            setError(false)
            setLoading(false)
            setShow(true)
            limpiar()
            obtenerDocumentos()
            setTimeout(() => {
                setShow(false)
            }, 1500);
            setTimeout(() => {
                document.getElementById("myInput").click();
            }, 1800);
            setTimeout(() => {
                obtenerDocumentos()
                setTimeout(() => {
                    obtenerDocumentos()
                }, 10000);
            }, 10000);
        } else if (cargaDocumento === 'ERROR') {
            setMensaje("El archivo adjunto fallo!")
            setError(true)
            setLoading(false)
            setShow(true)
            limpiar()
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const limpiar = async () => setTimeout(() => {
        document.getElementById("nombreDoc").classList.remove('is-valid')
        document.getElementById("adjunto").classList.remove('is-valid')
        setDocumentoId('')
        setSelectedFiles([])
        document.getElementById("adjunto").value = "";
        document.docXcuenta.btnSubmit.blur()
    }, 1500)

    const razonParaElEstado = (estado) => {
        var estadoDocumento;
        switch (estado) {
            case '1':
                estadoDocumento = 'Pendiente'
                break;
            case '100000000':
                estadoDocumento = 'Recibido'
                break;
            case '100000001':
                estadoDocumento = 'Aprobado'
                break;
            default:
                estadoDocumento = '---'
                break;
        }
        return estadoDocumento;
    }


    return (
        <animated.div className="container min-vh-100" style={fade}>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-5 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Documentación Enviada</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none pb-3">
                            <div className="lista-header color-header pad borde-none">
                                <div className="row p-3">
                                    <div className="col-6">
                                        Documentación
                                    </div>
                                    <div className="col-4 text-end">
                                        Estado
                                    </div>
                                    <div className="col-2 text-end">

                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner1">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group overflow-scroll lista-body">
                                    {
                                        carpetas.filter((carpeta) => carpeta.statuscode == 100000000 || carpeta.statuscode == 100000001).map(item => {
                                            return (
                                                <li key={item.new_documentacionporcuentaid} className="list-group-item h-100 p-0 pt-3 pb-3">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-6">
                                                            <p className="text-lowercase mx-3 m-0 fw-bolder texto-lista">{item.new_name}</p>
                                                        </div>
                                                        <div className="col-4 m-0 text-end">
                                                            <p className="text-lowercase m-0 fw-bolder mx-1 texto-lista">{(item.statuscode) ? razonParaElEstado(item.statuscode) : '---'}</p>
                                                        </div>
                                                        <div className="col-2 m-0">
                                                            <div className="dropdown">
                                                                <button className="btn float-end" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <FontAwesomeIcon id={item.new_documentacionporcuentaid} icon={faEllipsisH} className="fs-5 text-dark upload-file atras" />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                                                    <button
                                                                        type="button"
                                                                        className="btn dropdown-item text-light"
                                                                        id={item.new_vinculocompartido}
                                                                        // data-bs-toggle="modal"
                                                                        // data-bs-target="#ModalLink"
                                                                        onClick={e => e.target.id ? (window.open(e.target.id, "_blank")) : ''} 
                                                                    >
                                                                        {item.new_vinculocompartido ? ("Ver Documento") : "Subiendo a Sharepoint..."} 
                                                                    </button>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-12 color-header text-center c-azul fw-bolder">
                                        {carpetas.filter((carpeta) => carpeta.statuscode == 100000000 || carpeta.statuscode == 100000001).length} Documentos
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-7 pt-5 pb-5 p-2">
                    <div className="card shadow p-3 border-0 d-flex justify-content-start pad">
                        <div>
                            <h6 className="fw-bolder">Documentación Pendiente</h6>
                            <hr className="hr-width hr-principal" />
                        </div>
                        <div className="card doc-cards pad borde-none">
                            <div className="lista-header color-header pad">
                                <div className="row p-3">
                                    <div className="col-6">
                                        Documentación
                                    </div>
                                    <div className="col-5 text-end">
                                        Fecha Vencimiento
                                    </div>
                                    <div className="col-1 text-end">

                                    </div>
                                </div>
                                <div className="contenedor-spinner" id="spinner2">
                                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div>
                                <ul className="list-group w-100 overflow-auto lista-body">
                                    {
                                        carpetas.filter((carpeta) => carpeta.statuscode == 1).map(item => {
                                            return (
                                                <li key={item.new_documentacionporcuentaid} className="list-group-item h-100 p-0 pt-1 pb-1">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-6 m-0">
                                                            <p className="text-lowercase m-0 fw-bolder texto-lista mx-3" >
                                                                {item.new_name}
                                                            </p>
                                                        </div>
                                                        <div className="col-4 m-0 p-0 text-end">
                                                            <p className="text-lowercase m-0 fw-bolder text-end texto-lista">{(item.new_fechadevencimiento) ? Moment(item.new_fechadevencimiento).format("DD-MM-YYYY") : '---'}</p>
                                                        </div>
                                                        <div className="col-2 m-0">
                                                            <div className="dropdown">
                                                                <button className="btn float-end" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <FontAwesomeIcon id={item.new_documentacionporcuentaid} icon={faEllipsisH} className="fs-5 text-dark upload-file atras" />
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                                                    <button
                                                                        type="button"
                                                                        className="btn dropdown-item text-light"
                                                                        id={item.new_documentacionporcuentaid}
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#exampleModal"
                                                                        onClick={e => obtenerDocumento(e.target.id)}
                                                                    >
                                                                       Subir Documento
                                                                    </button>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="row p-3">
                                    <div className="col-sm-12 color-header text-center c-azul fw-bolder">
                                        {carpetas.filter((carpeta) => carpeta.statuscode == 1).length} Documentos
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered pad borde-none">
                    <div className="modal-content pad">
                        {/* <div className="modal-header color-header pad">
                            <h6 className="modal-title fw-bolder" id="exampleModalLabel">Cargar Documentacion</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> */}
                        <div className="modal-body">
                            <form name="docXcuenta" onSubmit={handleSubmission}>
                                <div className="mb-3 h-100">
                                    <div className="row">
                                        <div className="col-8">
                                            <h6 className="fw-bolder">Cargar Documentación</h6>
                                            <hr className="hr-width hr-principal" />
                                        </div>
                                        <div className="col-4">
                                            <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" id="myInput"></button>
                                        </div>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-lg fs-6 fw-bolder"
                                        id="nombreDoc"
                                        onChange={e => (e.target.value)}
                                        value={documento}
                                    />
                                    <div className="form-group pt-3">
                                        <input type="file"
                                            className='fw-bolder'
                                            name="file"
                                            id="adjunto"
                                            onChange={changeHandler}
                                            multiple
                                        />
                                    </div>
                                    <button type="submit"
                                        name="btnSubmit"
                                        className="btn btn-primary btn-lg mt-4"
                                    >Subir Documentación</button>
                                </div>
                            </form>
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
            <div className="modal fade bd-example-modal-lg" id="ModalLink" tabIndex="-1" aria-labelledby="ModalLinkLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered pad borde-none">
                    <div className="modal-content pad">
                        <div className="modal-body">
                            {/* <Link onClick={openTab('www.google.com')}> Ver Documentos</Link> */}
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
        </animated.div>
    )
}
