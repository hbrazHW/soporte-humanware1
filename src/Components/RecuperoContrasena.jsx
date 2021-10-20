import React from 'react'
import { withRouter } from 'react-router-dom'
import { Toast } from 'react-bootstrap'
import logo from '../img/Logo-Human-Blanco.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring'
import { useDispatch } from 'react-redux'
import { recuperarContraseña } from '../Redux/usuarios'

const RecuperoContrasena = (props) => {
    const dispatch = useDispatch()
    const [mail, setMail] = React.useState('')
    const [show, setShow] = React.useState(false)
    const [mensaje, setMensaje] = React.useState('')
    const [error, setError] = React.useState(false)

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    const ProcesarRecupero = e => {
        e.preventDefault()

        if (!mail.trim()) {
            console.log("Ingrese Email")
            document.getElementById("floatingInput").classList.add("is-invalid");
            return
        }
        else {
            document.getElementById("floatingInput").classList.remove('is-invalid')
        }

        // if (!pass.trim()) {
        //     console.log("Ingrese Contraseña")
        //     document.getElementById("floatingPassword").classList.add("is-invalid");
        //     return
        // }
        // else {
        //     document.getElementById("floatingPassword").classList.remove('is-invalid')
        // }

        // // fetch("https://localhost:44310/api/Account?filter=emailaddress1 eq '" + mail + "'")
        // //     .then(response => response.json())
        // //     .then(data => {
        // //         const cuenta = data
        // //         debugger;
        // //         let accountid = cuenta[0].Accountid
        // //         if(accountid != undefined){
        // //             const registro = dispatch(registrarUsuario(mail, pass, accountid))
        // //     }
        // //  })
        // document.getElementById("login").style.display = "none"
        // document.getElementById("spinner-login").style.display = "block"
        // dispatch(loginUsuario(mail, pass))
        // setLog(true)
        dispatch(recuperarContraseña(mail))
        setMensaje("Por favor, revise su correo electrónico para restaurar su contraseña.")
        setShow(true)
        Redirigir()
    }

    const Redirigir = async () => setTimeout(() => {
        props.history.push('/login')
    }, 2500)

    return (
        <animated.div className="portada" style={fade}>
            <div className="vh-100 vw-100 d-flex justify-content-center align-items-center login">
                <div className="contenedor-spinner" id="spinner-login">
                    <div className="lds-roller float-none w-100 d-flex justify-content-center mx--1" id="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="p-2 col-12 col-md-5 col-lg-4 col-xl-3" id="login">
                    <div className="mb-5 img-thumbail p-2">
                        <img className="rounded mx-auto d-block logo-login" src={logo} alt="" />
                    </div>
                    <div className="card shadow border-0 h-auto d-flex justify-content-start borde-none pad">
                        <div className="card-header bg-white h-100 d-flex align-items-center pad borde-none">
                            <div className="col-sm-12 pt-3">
                                <div className="float-left">
                                    <h6 className="m-0  fw-bold">Recuperar Contraseña</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            <form onSubmit={ProcesarRecupero}>
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
                                <div className="row mt-4">
                                    <div className="col-12">
                                        <button className="btn btn-primary btn-lg btn-block w-100"
                                            type="button"
                                            onClick={ProcesarRecupero}
                                        >Recuperar</button>
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

export default withRouter(RecuperoContrasena) 
