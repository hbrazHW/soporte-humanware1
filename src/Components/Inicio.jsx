import React from 'react'
import Moment from 'moment'
import { withRouter, NavLink } from 'react-router-dom'
import { Toast, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDocumentosPorCuenta, cargarDocumentacionPorCuenta } from '../Redux/CarpetaDigital'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faCheckCircle, faTimesCircle, faEnvelope, faClipboardList, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { obtenerCasos, cargarCaso } from '../Redux/Caso'
import Tabla from '../Components/Tabla'
import { COLUMNS } from '../Tables/casosColumns'
import { CASOSRESUELTOS } from '../Tables/casosResueltos'
import { obtenerSocios } from '../Redux/Cuenta'
import Select from 'react-select';
import MultiStepProgressBar from './MultiStepProgressBar'
import "react-step-progress-bar/styles.css";
import { obtenerActividades } from '../Redux/Actividad'
import { obtenerAsunto } from '../Redux/Asuntos'
import { createContext } from 'react'
import { UrlApiDynamics, Entidad } from '../Keys'


const Inicio = (props) => {
    //Constantes
    const dispatch = useDispatch()
    // const {} =
    const [show, setShow] = React.useState(false)
    const [carpetas, setCarpetas] = React.useState([])
    const [selectedFiles, setSelectedFiles] = React.useState([])
    const [documentoId, setDocumentoId] = React.useState('')
    const [documento, setDocumento] = React.useState('')
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [casos, setCasos] = React.useState([])
    const [llamadaCasos, setLlamadaCasos] = React.useState(false)
    const [registros, setRegistros] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [llamadaSocios, setLlamadaSocios] = React.useState(false)
    const [llamadaActividades, setLlamadaActividades] = React.useState(false)
    const [titulo, setTitulo] = React.useState('')
    const [cliente, setCliente] = React.useState('')
    const [sociosOpciones, setSociosOpciones] = React.useState([])
    const [socioid, setSocioid] = React.useState('')
    const [asunto, setAsunto] = React.useState('')
    const [llamadaAsunto, setLlamadaAsunto] = React.useState(false)
    const [ticket, setTicket] = React.useState('')
    const [estado, setEstado] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [descripciondelaresolucion,setDescripcionDeLaResolucion] = React.useState('')
    const [step, setStep] = React.useState(1);
    const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [actividades, setActividades] = React.useState([])
    const [tareas, setTareas] = React.useState([])
    const [opcionesAsunto, setOpcionesAsunto] = React.useState([]);
  

    let docPendiente = []

    //Reducers
    const activo = useSelector(store => store.usuarios.activo)
    const accountid = useSelector(store => store.usuarios.accountid)
    const contactid = useSelector(store => store.usuarios.contactid)
    const casoSelector = useSelector(store => store.casos.casos)
    const sociosSelector = useSelector(store => store.cuenta.socios)
    const resultado = useSelector(store => store.casos.resultadoCaso)
    const ticketSelector = useSelector(store => store.casos.ticket)
    const casoIdSelector = useSelector(store => store.casos.casoId)
    const actividadesSelector = useSelector(store => store.actividades.actividades)
    const tareasSelector = useSelector(store => store.tareas.tareas)
    const asuntoSelector = useSelector(store => store.asunto.asuntos)

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
            if (casoSelector.length > 0 && llamadaCasos === true) {
                setCasos(casoSelector)
                setRegistros("No se encontraron registros")
                if (document.getElementById("spinner1") !== null) {
                    document.getElementById("spinner1").hidden = true;
                }
                if (document.getElementById("spinner2") !== null) {
                    document.getElementById("spinner2").hidden = true;
                }
            } else if (casoSelector.length === 0 && llamadaCasos === false) {
                setTimeout(() => {
                    obtenerTodosCasos()
                }, 1500);
                setLlamadaCasos(true)
                setTimeout(() => {
                    if (document.getElementById("spinner1") !== null) {
                        document.getElementById("spinner1").hidden = true;
                    }
                    if (document.getElementById("spinner2") !== null) {
                        document.getElementById("spinner2").hidden = true;
                    }
                }, 3000);
            }

            if (actividadesSelector.length > 0) {
                setActividades(actividadesSelector)
                // if (document.getElementById("spinner4") !== null) {
                //     document.getElementById("spinner4").hidden = true;
                // }
                document.getElementById("spinner4").style.display = 'none';
            }

            if(asuntoSelector.length > 0 && llamadaAsunto === true ){
                completarOpcionesAsunto(asuntoSelector)
            }else if(llamadaAsunto === false ){
                obtenerAsuntos() 
                setLlamadaAsunto(true)

            }
  
            
            if (asuntoSelector.length > 0){
                 setAsunto(asuntoSelector)
            }



            if (tareasSelector.length > 0) {
                setTareas(tareasSelector)
            }
            // else{
            //     setTimeout(() => {
            //         if (document.getElementById("spinner4") !== null) {
            //             document.getElementById("spinner4").hidden = true;
            //         }
            //     }, 2000);
            // }

            if (resultado !== undefined) {
                if (resultado !== '') {
                    cargaExito()
                }
            }

            if (ticketSelector !== undefined) {
                if (ticketSelector !== '') {
                    setTimeout(() => {
                        setTicket(ticketSelector)
                        setEstado("En Curso")
                    }, 1500);

                }
            }

            if (casoIdSelector !== undefined) {
                if (casoIdSelector !== '') {
                    completarCamposCaso(casoIdSelector)
                }
            }
        }
        else {
            props.history.push('/login')
        }
    }, [activo, casoSelector, sociosSelector, resultado, ticketSelector, casoIdSelector,asuntoSelector, actividadesSelector, actividades, tareasSelector])



  


    const obtenerTodosCasos = async () => {
        dispatch(obtenerCasos(contactid))
    }

    const obtenerTodosSocios = async () => {
        dispatch(obtenerSocios())
    }

    const obtenerTodasActividades = async () => {
        dispatch(obtenerActividades())
    }

    const obtenerAsuntos  = async () => {
        dispatch(obtenerAsunto())
       
       
    }

    const obtenerDocumentoSelect = async (e) => {
        setDocumentoId(e)
        carpetas.filter(elemento => elemento.new_documentacionporcuentaid === e).map(item => {
            setDocumento(item)
        })
    }

    const obtenerCasoCreado = (id) => {
        casos.filter(item => item.incidentid == id).map(item => {
            setTicket(item.ticketnumber)
            setEstado('Caso Creado')
        })
    }

    const completarOpcionesSocios = (socios) => {
        const opcionesSocio = []
        socios.forEach(item => {
            var socio = { value: item.Accountid, label: item.Name }
            opcionesSocio.push(socio);
        });
        setSociosOpciones(opcionesSocio)
    }

    const completarOpcionesAsunto = (asunto) => {
         const opcionesAsunto = [];
            Array.from(asunto).forEach(item =>{
            var opcion ={value: item.subjectid , label: item.title }
            opcionesAsunto.push(opcion);

         });
    
   setOpcionesAsunto(opcionesAsunto)


   }





    const socioOnChange = (value) => {
        setSocioid(value)
    }


  
    const completarCamposCaso = (id) => {
        debugger;
        casos.filter(item => item.incidentid == id).map(item => {
            setTitulo(item.title)
            setTicket(item.ticketnumber)
            if(item.statuscode === "1"){
                setEstado('En Curso')
            }else if(item.statuscode === "4"){
                setEstado('En Investigación')
            }else{
                setEstado("Caso Creado")
            }
            setDescripcion(item.description)
            setDescripcionDeLaResolucion(item.descripciondelaresolucion)
            setAsunto(completarOpcionesAsunto(item.title))
            determinarEtapa(item.statuscode)
        })
    }

    const determinarEtapa = (etapa) => {
        switch (etapa) {
            case '1':
                setStep(2)
                break;
            case '4':
                setStep(3)
                break;
        }
    }

    const prioridadOpciones = [
        { value: '1', label: 'Alta' },
        { value: '2', label: 'Normal' },
        { value: '3', label: 'Baja' },
    ]

    const completarPrioridad = (valor) => {
        switch (valor) {
            case "1":
                return { value: valor, label: 'Alta' }
            case "2":
                return { value: valor, label: 'Normal' }
            case "3":
                return { value: valor, label: 'Baja' }
        }
    }
    


    const handleSubmission = (e) => {
        e.preventDefault()

        if (documentoId === '') {
            document.getElementById("documento").classList.add('is-invalid')
            setMensaje("El documento es requerido!")
            setError(true)
            setShow(true)
            return
        } else {
            document.getElementById("documento").classList.remove('is-invalid')
            document.getElementById("documento").classList.add("is-valid")
        }
        if (selectedFiles.length === 0) {
            document.getElementById("adjunto").classList.add('is-invalid')
            setMensaje("El archivo adjunto es requerido!")
            setError(true)
            setShow(true)
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
        dispatch(cargarDocumentacionPorCuenta(formData, config, documentoId, documento))
        setMensaje("La subida del archivo fue exitosa!")
        setError(false)
        setShow(true)
        limpiar()
    };

    const limpiar = async () => setTimeout(() => {
        document.getElementById("documento").classList.remove('is-valid')
        document.getElementById("adjunto").classList.remove('is-valid')
        setDocumentoId('')
        setSelectedFiles([])
        document.getElementById("adjunto").value = "";
        document.docXcuenta.btnSubmit.blur()
    }, 2500)

    const CrearNuevoCaso = (e) => {
        e.preventDefault()

        if (titulo === '') {
            //document.getElementById("titulo").classList.add('is-invalid')
             //setMensaje("El titulo es requerido!")
             // setError(true)
             // setShow(true)
             return
        } else {
            //document.getElementById("titulo").classList.remove('is-invalid')
        
        
        
        if(descripcion ==='') {
            //document.getElementById("descripcion").classList.add('is-invalid')
            setMensaje("Descripcion Requerida!")
            setError(true)
            setShow(true)
            return
        }else{
            //documen.getElementById("descripcion").classList.remove('is-invalid')
        }

        if(asunto === '') {
            //document.getElementById("asunto").classList.add('is-invalid')
            setMensaje("Asunto es Requerido!")
            setError(true)
            setShow(true)
            return
        }else{
            //documen.getElementById("asunto").classList.remove('is-invalid')
        }




        }
        if (cliente) {
            // document.getElementById("cliente").classList.add('is-invalid')
            setMensaje("El Cliente es requerido!")
            setError(true)
            setShow(true)
            return
        } else {
            // document.getElementById("cliente").classList.remove('is-invalid')
        }
        debugger;
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

        dispatch(cargarCaso(accountid, contactid, titulo, socioid,asunto, descripcion,descripciondelaresolucion, formData, config))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const abrirCargaCaso = () => {
        setEstado('Creando Caso')
        limpiarForm()
        document.getElementById("spinner4").style.display = 'block';
    }

    const limpiarForm = () => {
        setTitulo('')
        setSocioid('')
        setAsunto('')
        setDescripcion('')
        setDescripcionDeLaResolucion('')
        setTicket('')
        setStep(1)
    }

    const cargaExito = () => {
        debugger;
        if (resultado === "EXITO") {
            setMensaje("El caso fue creado con éxito!")
            setError(false)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                obtenerTodosCasos()
            }, 500);
            setTimeout(() => {
                setShow(false)
                setStep(2)
            }, 1500)
        }
        else if (resultado === "ERROR") {
            setMensaje("Error al crear caso!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const changeHandler = (event) => {
        setSelectedFiles(event.target.files)
        setIsFilePicked(true);
    };
    

    return (
        <animated.div className="container min-vh-100" style={fade}>
            <div className="row mt-3">
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-green">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Casos en curso</p>
                                <p className="m-0">
                                    {
                                        casos.filter(item => item.statuscode == 1).length
                                    }
                                </p>
                            </div>
                            <div className="col-3">
                                <div className="bg-green d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-orange">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Casos en investigación</p>
                                <p className="m-0">
                                    {
                                        casos.filter(item => item.statuscode == 4).length
                                    }
                                </p>
                            </div>
                            <div className="col-3">
                                <div className="bg-orange d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-warning">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Casos esperando dellates</p>
                                <p className="m-0">
                                    {
                                        casos.filter(item => item.statuscode == 3).length
                                    }
                                </p>
                            </div>
                            <div className="col-3">
                                <div className="bg-warning d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-red">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Casos retenidos</p>
                                <p className="fw=bolder m-0">
                                    {
                                        casos.filter(item => item.statuscode == 2).length
                                    }
                                </p>
                            </div>
                            <div className="col-3">
                                <div className="bg-red d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="borde-none pad w-100 mb-3 pt-3 pb-3">
                        <div className="row">
                            <div className="col-sm-6 m-0">
                                <span className="separador-titulo float-start m-0"></span>
                                <p className="pt-2 mx-2 pb-2 fw-bolder m-0 w-100">
                                    MIS CASOS
                                </p>
                            </div>
                            <div className="col-sm-4 col-md-3">

                            </div>
                            <div className="col-sm-2 col-md-3 p-2 pad-cards-inicio m-0 float-end d-flex align-items-center">
                                <button
                                    className="btn btn-primary float-end mx-3 w-100 pad"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalCaso"
                                    onClick={abrirCargaCaso}
                                >Nuevo Caso</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100">
                <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                    <div className="contenedor-spinner" id="spinner1">
                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    {casos.length > 0 ? (<Tabla lineas={casos.filter(item => item.statecode == 0)} columnas={COLUMNS} titulo={'Casos Activos'} />) : <p className="color-textp-lista fw-bolder m-0">{registros}</p>}
                </div>
            </div>

          

            <div className="row mt-3 justify-content-center">
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-green">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Estado: Aceptado</p>
                                {/* <p className="m-0">
                                    {
                                        casos.filter(item => item.statuscode == 1).length
                                    }
                                </p> */}
                            </div>
                            <div className="col-3">
                                <div className="bg-green d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                
                <div className="col-3">
                    <div className="card shadow borde-none pad-cards-inicio w-100 mb-3 pt-3 pb-3">
                        <div className="row d-flex align-items-center">
                            <div className="col-2">
                                <div className="dot mr-3 float-end bg-red">

                                </div>
                            </div>
                            <div className="col-7">
                                <p className="fuente-cards-inicio m-0 fuente-cards-inicio">Estado: Rechazado</p>
                                {/* <p className="fw=bolder m-0">
                                    {
                                        casos.filter(item => item.statuscode == 2).length
                                    }
                                </p> */}
                            </div>
                            <div className="col-3">
                                <div className="bg-red d-flex justify-content-center pad-icon">
                                    <FontAwesomeIcon icon={faClipboardList} className="fs-5 upload-file atras" color="#eee" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
         

            <div className="w-100 mt-3 mb-5">
                <div className="card shadow p-3 border-0 h-auto d-flex justify-content-start pad">
                    <div className="contenedor-spinner" id="spinner2">
                        <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    {casos.length > 0 ? (<Tabla lineas={casos.filter(item => item.statecode == 3)} columnas={CASOSRESUELTOS} titulo={'Casos Resueltos'} />) : <p className="color-textp-lista fw-bolder m-0">{registros}</p>}
                </div>
            </div>
            <div className="modal fade bd-example-modal-xl" id="ModalCaso" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-8">
                                    <h6 className="fw-bolder">Nuevo Caso</h6>
                                    <hr className="hr-width hr-principal" />
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" id="myInput"></button>
                                </div>
                            </div>
                            <div className="w-100 d-flex justify-content-center">
                                <div className="card shadow p-4 border-0 h-auto pad w-75 mb-4">
                                    <div className="contenedor-spinner" id="spinner1">
                                        <MultiStepProgressBar currentStep={step} />
                                    </div>
                                </div>
                            </div>
                            <form name="Alyc" onSubmit={CrearNuevoCaso}>
                                <div className="row w-auto d-flex justify-content-center">
                                    <h6 className="fw-bolder">Detalles Del Caso</h6>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">Título</label>
                                                <input type="text"
                                                   id="titulo"
                                                   name="titulo"
                                                   className="form-control"
                                                   onChange={e => setTitulo(e.target.value)}
                                                   value={titulo}
                                                   placeholder="titulo..."
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion requerido">Cliente</label>
                                                <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                    id="bancos"
                                                    onChange={e => socioOnChange(e)}
                                                    // value={actividadEsperada}
                                                    name="colors"
                                                    options={sociosOpciones}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Buscar..."
                                                >
                                                </Select>
                                            </div>
                                        </div> */}
                                        {/* <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion requerido">Prioridad</label>
                                                <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                    id="bancos"
                                                    onChange={e => prioridadOnChange(e)}
                                                    value={prioridad}
                                                    name="colors"
                                                    options={prioridadOpciones}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Buscar..."
                                                >
                                                </Select>
                                            </div>
                                        </div> */}
                                        <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion requerido">Asunto</label>    
                                                       <Select className="form-select titulo-notificacion form-select-lg mb-3 fww-bolder h6"
                                                           id="asuntos"
                                                           onChange={e => setAsunto (e)}
                                                           options={opcionesAsunto}
                                                           name="colors"
                                                           value={asunto}
                                                           className="basic multi-select"
                                                           ClassNamePrefix="select"
                                                           placeholder="Elegir Asunto..."
                                                           
                                                         >
                                                        </Select >
                                            </div>
                                                

                                        </div>
                                        <div className="col-4">
                                        </div>
                                        <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">Ticket</label>
                                                <input type="text"
                                                    id="ticket"
                                                    name="ticket"
                                                    className="form-control desabilitado"
                                                    onChange={e => setTicket(e.target.value)}
                                                    value={ticket}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion">Estado</label>
                                                <input type="text"
                                                    id="estado"
                                                    name="estado"
                                                    className="form-control desabilitado"
                                                    onChange={e => setEstado(e.target.value)}
                                                    value={estado}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="fw-bolder requerido">Descripción</h6>
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <textarea
                                                    className="form-control mt-2"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    onChange={e => setDescripcion(e.target.value)}
                                                    value={descripcion}
                                                    placeholder="comentanos un poco más..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className="fw-bolder requerido">Resolucion de la Descripción</h6>
                                    
                                    <div className="row">
                                        <div className="col-12">
                                            <div class="form-group">
                                                <textarea
                                                    className="form-control mt-2"
                                                    id="exampleFormControlTextarea2"
                                                    rows="3"
                                                    onChange={e => setDescripcionDeLaResolucion(e.target.value)}
                                                    value={descripciondelaresolucion}
                                                    placeholder="resolucion del caso?.."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div> 







                                    <div className="row">
                                        <div className="custom-input-file col-12 mt-4">
                                            {/* <div class="custom-input-file col-md-6 col-sm-6 col-xs-6">
                                                <input type="file" id="fichero-tarifas" class="input-file" value="">
                                                Subir fichero...
                                            </div> */}
                                            <div class="form-group borde_discontinuo">
                                                {/* <input type="file"
                                                    className='fw-bolder input-file mx-4 borde_discontinuo'
                                                    name="file"
                                                    id="adjunto"
                                                    onChange={changeHandler}
                                                    multiple
                                                /> */}
                                                <input type="file"
                                                    className='fw-bolder input-file '
                                                    name="file"
                                                    id="adjunto"
                                                    onChange={changeHandler}
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <ul>
                                            {
                                                selectedFiles.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex align-items-center">
                                                            <p className="fw-bolder"><FontAwesomeIcon icon={faEnvelope} className="fs-6 upload-file atras mx-1" color="#000" />{item.name}</p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div> */}
                                </div>
                                <button
                                    type="submit"
                                    name="btnSubmitAlyc"
                                    className="btn btn-primary btn-lg mt-4 text-center block"
                                >Crear Caso</button>
                            </form>
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
            </div>
            <div className="modal fade bd-example-modal-xl" id="ModalEdicionCaso" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-8">
                                    <h6 className="fw-bolder">Caso</h6>
                                    <hr className="hr-width hr-principal" />
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" id="myInput"></button>
                                </div>
                            </div>
                            <div className="w-100 d-flex justify-content-center">
                                <div className="card shadow p-4 border-0 h-auto pad w-75 mb-4">
                                    <div className="contenedor-spinner" id="spinner1">
                                        <MultiStepProgressBar currentStep={step} />
                                    </div>
                                </div>
                            </div>
                            <form name="Alyc" onSubmit={CrearNuevoCaso}>
                                <div className="row w-auto d-flex justify-content-center">
                                    <div className="col-8">
                                        <h6 className="fw-bolder">Detalles Del Caso</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">Título</label>
                                                    <input type="text"
                                                        id="titulo"
                                                        name="titulo"
                                                        className="form-control desabilitado"
                                                        onChange={e => setTitulo(e.target.value)}
                                                        value={titulo}
                                                        placeholder="titulo..."
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-4">
                                            <div className="mb-2 p-2">
                                                <label className="form-label fw-bolder lbl-precalificacion requerido">Cliente</label>
                                                <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                    id="bancos"
                                                    onChange={e => socioOnChange(e)}
                                                    // value={actividadEsperada}
                                                    name="colors"
                                                    options={sociosOpciones}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    placeholder="Buscar..."
                                                >
                                                </Select>
                                            </div>
                                        </div> */}
                                            {/* <div className="col-6">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">Prioridad</label>
                                                    <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                        id="bancos"
                                                        onChange={e => prioridadOnChange(e)}
                                                        value={prioridad}
                                                        name="colors"
                                                        options={prioridadOpciones}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Buscar..."
                                                    >
                                                    </Select>
                                                </div>
                                            </div> */}

                                            <div className="col-6">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion requerido">Asunto</label>
                                                    <Select className="form-select titulo-notificacion form-select-lg mb-3 fw-bolder h6"
                                                     id="asuntos"
                                                     onChange={e => setAsunto (e)}
                                                     options={opcionesAsunto}
                                                     name="colors"
                                                     value={asunto}
                                                     className="basic multi-select"
                                                     ClassNamePrefix="select"
                                                     placeholder="Elegir Asunto..."
                                                     
                                                    >
                                                    </Select>
                                                </div>
                                            </div>


                                            <div className="col-6">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Ticket</label>
                                                    <input type="text"
                                                        id="ticket"
                                                        name="ticket"
                                                        className="form-control desabilitado"
                                                        onChange={e => setTicket(e.target.value)}
                                                        value={ticket}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="mb-2 p-2">
                                                    <label className="form-label fw-bolder lbl-precalificacion">Estado</label>
                                                    <input type="text"
                                                        id="estado"
                                                        name="estado"
                                                        className="form-control desabilitado"
                                                        onChange={e => setEstado(e.target.value)}
                                                        value={estado}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="fw-bolder requerido">Descripción</h6>
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <textarea
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        rows="7"
                                                        onChange={e => setDescripcion(e.target.value)}
                                                        value={descripcion}
                                                        placeholder="comentanos un poco más..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        
                                         <h6 className="fw-bolder requerido">Resolución de la Descripción</h6>
                                        <div className="row">
                                            <div className="col-12">
                                                <div class="form-group">
                                                    <textarea
                                                        className="form-control mt-2"
                                                        id="exampleFormControlTextarea1"
                                                        rows="7"
                                                        onChange={e => setDescripcionDeLaResolucion(e.target.value)}
                                                        value={descripciondelaresolucion}
                                                        placeholder="Cual fue la resolución del caso?..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
 



                                    </div>
                                    <div className="col-4">
                                        <h6 className="fw-bolder">Actividades</h6>
                                        <div className="contenedor-spinner" id="spinner4">
                                            <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        </div>
                                        <ul className="list-group">
                                            {
                                                actividadesSelector.map(item => {
                                                    return (
                                                        <li className="list-group-item d-flex align-items-center">
                                                            <p className="fw-bolder"><FontAwesomeIcon icon={faEnvelope} className="fs-6 upload-file atras mx-1" color="#000" />{item.subject}</p>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                {/* <button
                                    type="submit"
                                    name="btnSubmitAlyc"
                                    className="btn btn-primary btn-lg mt-4 text-center block"
                                >Crear Caso</button> */}
                            </form>
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
            </div>
        </animated.div>
    )
}

export default withRouter(Inicio)
