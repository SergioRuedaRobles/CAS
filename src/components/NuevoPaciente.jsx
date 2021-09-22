import React from 'react'
import {withRouter} from 'react-router-dom'
import {auth, url} from '../firebase'
import { CuidadorContext } from '../context/DatosCuidador'
import { v4 as uuidv4 } from 'uuid';

const NuevoPaciente = (props) => {

    const superagent = require('superagent');

    const [user, setUsert] = React.useState(null)
    const {cuidador} = React.useContext(CuidadorContext)
    //campos de formulario
    const [nombre, setNombre] = React.useState("")
    const [apellidos, setApellidos] = React.useState("")
    const [direccion, setDireccion] = React.useState("")
    const [cp, setCP] = React.useState(0)
    const [ciudad, setCiudad] = React.useState("")
    const [edad, setEdad] = React.useState(0)
    const [emailPaciente, setEmailPaciente] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [descripcion, setDescripcion] = React.useState("")
    const [telf, setTelf] = React.useState(0)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {//controla si el usuario ha iniciado sesion
        if(auth.currentUser){
            setUsert(auth.currentUser)
        }else{
            console.log('No existe usuario')
            props.history.push('/login')
        }
    }, [user, props.history]) 

    const procesarErrores = (e) => {
        e.preventDefault()//evita las redirecciones get por defecto
        if(!nombre.trim()){
            setError('Ingrese un nombre')
            return
        }
        if(!apellidos.trim()){
            setError('Ingrese al menos un apellido')
            return
        }
        if(!direccion.trim()){
            setError('Ingrese la dirección del cliente')
            return
        }
        if(!ciudad.trim()){
            setError('Ingrese la ciudad del cliente')
            return
        }
        if(!cp>0){
            setError('Ingrese el código postal del cliente')
            return
        }
        if(!telf>0){
            setError('Ingrese un número de teléfono')
            return
        }
        if(!emailPaciente.trim()){
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
        registrar()
    }

    const registrar = async() => {
        const idCliente = uuidv4();
        const urlFinal = url + cuidador.id + "/nuevo-cliente"
        try{
            await superagent.post(urlFinal)
                .send({ nombre: nombre,
                        apellidos: apellidos,
                        direccion: direccion,
                        codPostal: cp,
                        ciudad: ciudad,
                        edad: edad,
                        idCuidador: cuidador.id,
                        email: emailPaciente,
                        pass: pass,
                        idCliente: idCliente,
                        descripcion: descripcion,
                        telf: telf
                    }).then(() => {
                        props.history.push("/cuidador")
                })
                .then((response) => {
                    if(response.text === "Email ya existente"){
                        setEmailPaciente("El email ya existe")
                    }
            })
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={procesarErrores}>
                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }
                Nombre: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese un nombre"
                    onChange={e => setNombre(e.target.value)}
                    value={nombre}
                />
                Apellidos: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese apellidos"
                    onChange={e => setApellidos(e.target.value)}
                    value={apellidos}
                />
                Dirección: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese la dirección"
                    onChange={e => setDireccion(e.target.value)}
                    value={direccion}
                />
                Ciudad/Localidad/Municipio: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese la ciudad"
                    onChange={e => setCiudad(e.target.value)}
                    value={ciudad}
                />
                Código Postal: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese el código postal"
                    onChange={e => setCP(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={cp}
                />
                Edad: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese la edad"
                    onChange={e => setEdad(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={edad}
                />
                Descripción: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese una descripción del paciente"
                    onChange={e => setDescripcion(e.target.value)}
                    value={descripcion}
                />
                Teléfono: 
                <input 
                    className="form-control mt-2"
                    placeholder="Ingrese un teléfono de contacto"
                    onChange={e => setTelf(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={telf}
                />
                Email: 
                <input 
                    type="email"
                    className="form-control mt-2"
                    placeholder="Ingrese un email"
                    onChange={e => setEmailPaciente(e.target.value)}
                    value={emailPaciente}
                />
                Contraseña de acceso: 
                <input 
                    type="password"
                    className="form-control mt-2"
                    placeholder="Ingrese una contraseña"
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                />
                <button className="btn btn-info btn-lg btn-block mt-2" type='submit'>
                    Registrar Cliente
                </button>
            </form> 
        </div>
    )
}

export default withRouter(NuevoPaciente)