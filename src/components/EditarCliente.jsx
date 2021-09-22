import React from 'react'
import {withRouter} from 'react-router-dom'
import {url} from '../firebase'

const EditarCliente = (props) => {

    const superagent = require('superagent');

    const [nombre, setNombre] = React.useState(props.cliente.nombre)
    const [apellidos, setApellidos] = React.useState(props.cliente.apellidos)
    const [direccion, setDireccion] = React.useState(props.cliente.direccion)
    const [cp, setCP] = React.useState(props.cliente.codPostal)
    const [ciudad, setCiudad] = React.useState(props.cliente.ciudad)
    const [edad, setEdad] = React.useState(props.cliente.edad)
    const [emailPaciente, setEmailPaciente] = React.useState(props.cliente.email)
    const [pass, setPass] = React.useState("")
    const [descripcion, setDescripcion] = React.useState(props.cliente.descripcion)
    const [telf, setTelf] = React.useState(props.cliente.tlf)

    const procesarEdicion = (e) => {
        e.preventDefault()
        editarCliente()
        props.history.push('/cuidador')
    }

    const editarCliente = async() => {
        const urlFinal = url + "editar-cliente"
        //const datos = controlDatos()
        try{
            await superagent.post(urlFinal)
                .send({
                        nombre: nombre,
                        apellidos: apellidos,
                        direccion: direccion,
                        codPostal: cp,
                        ciudad: ciudad,
                        edad: edad,
                        descripcion: descripcion,
                        telf: telf,
                        email: emailPaciente,
                        pass: pass,
                        idcliente: props.idCliente
                    })
                .then(() => {
                    props.history.push('/cuidador')
            })
            props.history.push('/cuidador')
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={procesarEdicion}>
                    <label className="text-info">Nombre:</label>
                    <input 
                        className="form-control"
                        placeholder="Introduce un nombre"
                        onChange={e => setNombre(e.target.value)}
                        value={nombre}
                    />
                    <label className="text-info">Apellidos:</label> 
                    <input 
                        className="form-control"
                        placeholder="Ingrese apellidos"
                        onChange={e => setApellidos(e.target.value)}
                        value={apellidos}
                    />
                    <label className="text-info">Dirección:</label>
                    <input 
                        className="form-control"
                        placeholder="Ingrese la dirección"
                        onChange={e => setDireccion(e.target.value)}
                        value={direccion}
                    />
                    <label className="text-info">Ciudad:</label> 
                    <input 
                        className="form-control"
                        placeholder="Ingrese la ciudad"
                        onChange={e => setCiudad(e.target.value)}
                        value={ciudad}
                    />
                    <label className="text-info">Código Postal:</label>
                    <input 
                        className="form-control"
                        placeholder="Ingrese el código postal"
                        onChange={e => setCP(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                        value={cp}
                    />
                    <label className="text-info">Edad:</label>
                    <input 
                        className="form-control"
                        type="number"
                        placeholder="Ingrese la edad"
                        onChange={e => setEdad(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                        value={edad}
                    />
                    <label className="text-info">Descripción:</label>
                    <textarea  
                        className="form-control"
                        type="textarea"
                        placeholder="Ingrese una descripción"
                        onChange={e => setDescripcion(e.target.value)}
                        value={descripcion}
                    />
                    <label className="text-info">Teléfono:</label>
                    <input 
                        className="form-control"
                        placeholder="Ingrese un teléfono de contacto"
                        onChange={e => setTelf(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                        value={telf}
                    />
                    <label className="text-info">Email:</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="Ingrese un email"
                        onChange={e => setEmailPaciente(e.target.value)}
                        value={emailPaciente}
                    />
                    <label className="text-info">Contraseña de acceso:</label>
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="Ingrese una contraseña"
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                    />
                    <button className="btn btn-info btn-lg btn-block mt-2" type='submit'>
                        Editar Paciente
                    </button>
                </form>
        </div>
    )
}

export default withRouter(EditarCliente)
