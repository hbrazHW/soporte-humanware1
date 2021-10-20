import React from 'react'
import { registrarUsuario, registrarUsuarioContacto, loginUsuario, cerrarSesion } from '../Redux/usuarios'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link, NavLink, useHistory } from 'react-router-dom'
import { Toast, Spinner } from 'react-bootstrap'
import logo from '../img/Logo-Human-Blanco.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { auth, firebase } from '../Firebase'
import ReCAPTCHA from 'react-google-recaptcha'
import { RecaptchaKey } from '../Keys'

const Registro = () => {
    const dispatch = useDispatch()
    let history = useHistory();
    const errorSelector = useSelector(store => store.usuarios.error)
    const activo = useSelector(store => store.usuarios.activo)
    const resultado = useSelector(store => store.usuarios.resultado)

    const [mail, setMail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)
    const [robot, setRobot] = React.useState(false)
    const [loading, setLoading] = React.useState('')

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    React.useEffect(async () => {
        if (resultado !== undefined) {
            if (resultado !== '') {
                registroExito()
            }
        }
    }, [resultado])

    const ProcesarLogin = e => {
        e.preventDefault()
        if (!mail.trim()) {
            console.log("Ingrese Email")
            document.getElementById("floatingInput").classList.add("is-invalid");
            return
        }
        else {
            document.getElementById("floatingInput").classList.remove('is-invalid')
        }

        if (!pass.trim()) {
            console.log("Ingrese Contraseña")
            document.getElementById("floatingPassword").classList.add("is-invalid");
            return
        }
        else {
            document.getElementById("floatingPassword").classList.remove('is-invalid')
        }

        const resp = dispatch(registrarUsuarioContacto(mail, pass))
        setLoading(true)
        setMensaje("Cargando...")
        setShow(true)
    }

    const registroExito = () => {
        if (resultado === 'EXITO') {
            setMensaje("La cuenta se registro con exito!")
            setError(false)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
            setTimeout(() => {
                history.push("/")
            }, 600);
        } else if (resultado === 'ERROR') {
            setMensaje("La cuenta que desea registrar ya existe!")
            setError(true)
            setLoading(false)
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    const onChange = () => {
        setRobot(true)
    }

    return (
        <animated.div className="portada" style={fade}>
            <div className="min-vh-100 vw-100 d-flex justify-content-center align-items-center login">
                <div className="contenedor-spinner" id="spinner-login">
                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="p-2 col-sm-8 col-md-5 col-lg-4 col-xl-3" id="login">
                    <div className="mb-2 img-thumbail p-4">
                        <img className="rounded mx-auto d-block contenedor-logo logo-login" src={logo} alt="" />
                    </div>
                    <div className="card shadow border-0 h-auto d-flex justify-content-start borde-none pad">
                        <div className="card-header bg-white h-100 d-flex align-items-center pad borde-none">
                            <div className="col-sm-5 mt-3">
                                <div className="float-left">
                                    <h6 className="m-0  fw-bold">Crear Cuenta</h6>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="float-right text-end">
                                    <Link className=" link-recupero  p-1" to="/precalificacion-crediticia"></Link>
                                </div>
                            </div>

                        </div>
                        <div className="card-body p-3">
                            <form onSubmit={ProcesarLogin}>
                                <div className="form-floating mb-3">
                                    <input type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={e => setMail(e.target.value)}
                                        value={mail}
                                    />
                                    <label htmlFor="floatingInput">Correo electrónico</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={e => setPass(e.target.value)}
                                        value={pass}
                                    />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <ReCAPTCHA
                                        // ref={recaptchaRef}
                                        className=""
                                        render="explicit"
                                        sitekey={RecaptchaKey}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        <button className="btn btn-primary btn-lg btn-block w-100"
                                            type="button"
                                            onClick={ProcesarLogin}
                                        >Registrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 position-fixed bottom-0 end-0 p-5 noti">
                    {/* <Toast className="half-black" onClose={() => setShow(false)} show={show} delay={3000} autohide color="lime"> */}
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

export default Registro
