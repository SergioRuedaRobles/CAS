import React from 'react'
import {auth, url} from '../firebase'
import {withRouter} from 'react-router-dom'
import md5 from 'md5'
import { ClienteContext } from '../context/DatosCliente'
import { CuidadorContext } from '../context/DatosCuidador'


const Login = (props) => {
    const superagent = require('superagent');

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(false)
    
    const {actualizarCliente} = React.useContext(ClienteContext)
    const {cuidador, actualizarCuidador} = React.useContext(CuidadorContext)

    const procesarLogin = e => {
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese un email')
            return
        }
        if(!pass.trim()){
            setError('Ingrese una contraseña')
            return
        }
        if(pass.length < 6){
            setError('La contraseña debe tener más de 5 carácteres')
            return
        }
        setError(null)

        if(esRegistro){
            registrar()
        }else{
            login()
        }
    }

    const cargarCuidador = React.useCallback( async(id) => {
        const urlFinal = url + "cuidador/" + id
        try {
            const response = await fetch(urlFinal)
            const responseJSON = await response.json()
            if(responseJSON){
                actualizarCuidador(responseJSON)
            }
        } catch (error) {
            console.log(error)
        }
    },[actualizarCuidador])

    const loginCliente = React.useCallback(async() => {
        const urlFinal = url + "login/" + email
        let cliente = {}
        try {
            const response = await fetch(urlFinal)
            const responseJSON = await response.json()
            if(responseJSON){
                cliente = responseJSON
            }
        } catch (error) {
            console.log(error)
        }
        if(cliente[0]){
            const hash = md5(pass)
            if(cliente[0].pass === hash){
                actualizarCliente(cliente[0])
                cargarCuidador(cliente[0].idCuidador)
                if(cuidador){
                    props.history.push(`/cliente/${cliente[0].id}`)
                }
            }else{
                setError('Contraseña incorrecta')
            }
        }else{
            setError('Usuario incorrecto')
        }
    }, [email, props.history, pass, actualizarCliente, cargarCuidador, cuidador])

    const login = React.useCallback(async() => {
        try{
            await auth.signInWithEmailAndPassword(email, pass)
            actualizarCuidador({email: email, id: auth.currentUser.uid})
            props.history.push('/cuidador')
        }catch(error){
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }else if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }else if('auth/user-not-found'){
                loginCliente()
            }
        }
    }, [email, pass, props.history, loginCliente, actualizarCuidador])

    const registrar = React.useCallback(async() => {
        const urlFinal = url + 'registro'
        try {
            await auth.createUserWithEmailAndPassword(email, pass)
            await superagent.post(urlFinal)
                .send({ email: email, id: auth.currentUser.uid })
                .then(() => {
                    actualizarCuidador({email: email, id: auth.currentUser.uid})
                    props.history.push('/cuidador')
            })
        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }else if(error.code === 'auth/email-already-in-use'){
                setError('Ya existe una cuenta con ese email')
            }
        }
    }, [email, pass, props, superagent, actualizarCuidador])

    const limpiar = () => {//cambia entre el inicio y el registro
        setEmail('')//y limpia los campos
        setPass('')
        setError(null)
        setEsRegistro(!esRegistro)
    }

    return (
        <div className="mt-5">
            <h3 className="text-center text-info">
                {
                    esRegistro ? 'Registro de Cuidador' : 'Acceso de Cuidador'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form id="registro-form" onSubmit={procesarLogin}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        Email<input 
                            type="email" 
                            className="form-control mt-2"
                            placeholder="Ingrese un email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        Contraseña<input 
                            type="password"
                            className="form-control mt-2"
                            placeholder="Ingrese una contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button className="btn btn-info btn-lg btn-block mt-2" type='submit'>
                            {
                                esRegistro ? 'Registrarse' : 'Iniciar sesión'
                            }
                        </button>
                        <button 
                            className="btn btn-secondary btn-sm btn-block"
                            onClick={() => limpiar()}
                            type='button'
                        >
                            {
                                esRegistro ? (
                                    '¿Ya registrado?' 
                                    ): '¿Registrarse?'
                            }
                        </button>
                        {
                            !esRegistro ? (
                                <button
                                    className="btn btn-link btn-block"
                                    onClick={() => props.history.push('/resetPsw')}
                                >
                                    ¿Olvidaste la contraseña?
                                </button>
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
