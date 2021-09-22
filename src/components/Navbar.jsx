import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {auth} from '../firebase'
import { withRouter } from 'react-router-dom'
import { ClienteContext } from '../context/DatosCliente'
import { CuidadorContext } from '../context/DatosCuidador'

const Navbar = (props) => {

    const {actualizarCliente} = React.useContext(ClienteContext)
    const {actualizarCuidador} = React.useContext(CuidadorContext)

    const cerrarSesion = () => {
        actualizarCliente(null)
        actualizarCuidador(null)
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    const ruta = "/cliente/" + JSON.parse(localStorage.getItem('sesionCliente'))

    return (
        <div className="navbar bg-light">
            <Link to="/" className="navbar-brand ml-2 text-info">CAS</Link>
            <div>
                <div className="d-flex">
                    <NavLink 
                        className="btn btn-info mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>
                    {
                        props.firebaseUser !== null ? (
                            <NavLink 
                                className="btn btn-info mr-2" 
                                to="/cuidador"
                            >
                                Panel de cuidador
                            </NavLink>
                        ) : null
                    }
                    {
                        localStorage.getItem('sesionCliente') ? (
                            <NavLink 
                                className="btn btn-info mr-2" 
                                to={ruta}
                            >
                                Ver mi calendario
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null || localStorage.getItem('sesionCliente') ? (
                        <button 
                            className="btn btn-info" 
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                        ): (
                        <NavLink 
                            className="btn btn-info" 
                            to="/login"
                        >
                            Login
                        </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
