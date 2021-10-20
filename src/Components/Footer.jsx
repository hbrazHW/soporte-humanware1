import React from 'react'

const Footer = (props) => {
    return props.loggedUser === true ? (
        <div className="footer bg-dark ">
            <h6 className="text-center p-4 text-white m-0">© 2021. Todos los derechos reservados</h6>
        </div>
    ) : <div></div>
}

export default Footer
