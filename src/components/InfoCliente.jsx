import React from 'react'
import {auth, url} from '../firebase'
import {Link, useParams, withRouter} from 'react-router-dom'
import EditarCliente from './EditarCliente'

const EditarPaciente = (props) => {

    const [clienteCargado, setClienteCargado] = React.useState({})
    const {idCliente} = useParams()

    const [showEdit, setShowEdit] = React.useState(false)

    const superagent = require('superagent');

    React.useEffect(() => {
        if(auth.currentUser){
            const urlFinal = url + "cliente/" + idCliente
            const fetchApi = async () => {
                try {
                    const response = await fetch(urlFinal)
                    const responseJSON = await response.json()
                    if(responseJSON){
                        setClienteCargado(responseJSON)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchApi()
            return () => {
            }
        }else{
            console.log('No existe usuario')
            props.history.push('/login')
        }
    }, [props.history, idCliente, showEdit])

    const borrarCliente = async(id) =>{
        const urlFinal = url + "/borrar-cliente"
        try{
            await superagent.delete(urlFinal)
                .send({ idCliente: idCliente })
                .then(() => {
                    props.history.push("/cuidador")
            })
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <h3 className="mt-4 text-info font-weight-bold">Datos del cliente</h3>
            <div className="card mb-2">
                <div className="card-header">
                    <h4 className="card-title font-weight-bold float-left">{clienteCargado.nombre} {clienteCargado.apellidos}</h4>
                    <div className="text-right"><button className="btn btn-info" onClick={() => borrarCliente(idCliente)}>Borrar cliente</button></div>
                </div>
                <div className="card-body">
                    <h5 className="card-subtitle mb-2 text-muted float-left">
                        <b>Dirección:</b> {clienteCargado.direccion}
                    </h5>
                    <h5 className="card-subtitle mb-2 text-muted text-right">
                        <b>Ciudad/Provincia: </b>{clienteCargado.ciudad}   <b>Código Postal: </b>{clienteCargado.codPostal}
                    </h5>
                    <p/>
                    <h5 className="card-subtitle mb-2 text-muted text-left">
                        <b>Correo electrónico:</b> {clienteCargado.email}
                    </h5>
                    <p className="card-text justify-content-center"><b>Descripción:</b> {clienteCargado.descripcion}</p>
                </div>
                <div className="card-footer text-muted font-weight-bold">
                    <div className="float-left mt-1">{clienteCargado.tlf}</div>
                    <div className="text-right">
                        <Link className="btn btn-info" to={`/mensajeria/${idCliente}`}>Mandar mensaje</Link>
                    </div>
                </div>
            </div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1" onClick={() =>setShowEdit(!showEdit)}>Editar Cliente</label>
            </div>
            {showEdit ? (
                <EditarCliente idCliente={idCliente} cliente={clienteCargado}/>
            ):null} 
        </div>
    )
}

export default withRouter(EditarPaciente)
