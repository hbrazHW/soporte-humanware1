import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUsuario, registrarUsuario, comprobarUsuarioDynamics, limpiarError } from '../Redux/usuarios'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { Toast } from 'react-bootstrap'
import logo from '../img/Logo-Human-Blanco.png'
import fondo from '../img/Fondo-Mills.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { auth, firebase } from '../Firebase'


const Login = (props) => {
    const dispatch = useDispatch()
    const errorSelector = useSelector(store => store.usuarios.error)
    const activo = useSelector(store => store.usuarios.activo)

    const [log, setLog] = React.useState(false)
    const [mail, setMail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        if (activo) {
            props.history.push('/')
        } else if (errorSelector && log) {
            document.getElementById("login").style.display = "block"
            document.getElementById("spinner-login").style.display = "none"
            setError(true)
            setMensaje("La constraseña o la cuenta es incorrecta")
            setShow(true)
            dispatch(limpiarError())
        }
    }, [activo, errorSelector, props.history])

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    const ProcesarLogin = e => {
        e.preventDefault()
        debugger;
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

        dispatch(loginUsuario(mail, pass))

        fetch("http://localhost:58371/api/Account?filter=emailaddress1 eq '" + mail + "'&cuit=OneClickSgr")
            .then(response => response.json())
            .then(data => {
                const cuenta = data
                debugger;
                let accountid = cuenta[0].Accountid
                if (accountid != undefined) {
                    firebase.collection('usuarios').doc('rKIZIeMicoQ55E8qjOQFEz7r9bz1').set({
                        email: 'samsungsa@gmail.com',
                        uid: 'rKIZIeMicoQ55E8qjOQFEz7r9bz1',
                        accountid: accountid
                    })
                    // const registro = dispatch(registrarUsuario(mail, pass, accountid))
                }
            })
        document.getElementById("login").style.display = "none"
        document.getElementById("spinner-login").style.display = "block"
        // dispatch(loginUsuario(mail, pass))
        setLog(true)
    }

    var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: "url(" + { fondo } + ")"
    };

    return (
        <animated.div className="portada" style={fade} > 
            <div className="min-vh-100 vw-100 d-flex justify-content-center align-items-center login">
                <div className="contenedor-spinner" id="spinner-login">
                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="p-2 col-sm-8 col-md-5 col-lg-4 col-xl-3" id="login">
                    <div className="mb-5 img-thumbail ">
                        <img className="rounded mx-auto d-block contenedor-logo logo-login" src={logo} alt="" />
                    </div>
                    <div className="card shadow border-0 h-auto d-flex justify-content-start borde-none pad">
                        <div className="card-header bg-white h-100 d-flex align-items-center pad borde-none">
                            <div className="col-sm-5">
                                <div className="float-left">
                                    <h6 className="m-0  fw-bold">Iniciar Sesión</h6>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="float-right text-end">
                                    <Link className=" link-recupero  p-1" to="/precalificacion-crediticia">Todavia no sos socio? ingresa aca</Link>
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
                                <div className="row mt-4">
                                    <div className="col-sm-6">
                                        <div className="form-check">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                value="check"
                                                id="flexCheckDefault"
                                                checked
                                                readOnly
                                            />
                                            <label className="form-check-label fs-6 fw-bold" hrmlfor="flexCheckDefault">
                                                Recordarme
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="float-right text-end">
                                            <NavLink className="link-recupero" to="/recupero">olvidaste tu contraseña?</NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        <button className="btn btn-primary btn-lg btn-block w-100"
                                            type="button"
                                            onClick={ProcesarLogin}
                                        >Ingresar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <animated.div className="row" style={fade}>
                <div className="col-sm-4 position-fixed bottom-0 end-0 p-5 noti">
                    <Toast className="half-black" onClose={() => setShow(false)} show={show} delay={3000} autohide color="lime">
                        <Toast.Body className="text-white">
                            <div className="row">
                                <div className="col-sm-1 mx-2">
                                    {error ? <FontAwesomeIcon icon={faTimesCircle} className="fs-3 upload-file atras" color="#dc3545" /> : <FontAwesomeIcon icon={faCheckCircle} className="fs-3 upload-file atras" color="#198754" />}
                                </div>
                                <div className="col-sm-10 mt-1 ml-5">
                                    {mensaje}
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </div>
            </animated.div>
        </animated.div>
    )
}

export default withRouter(Login)
