import React from 'react'
import { useParams } from 'react-router-dom'
import {auth, url} from '../firebase'
import imgCliente from '../images/cliente.png'
import imgCuidador from '../images/cuidador.png'

const Mensajeria = () => {

    const {idCliente} = useParams()
    

    const [mensajes, setMensajes] = React.useState([])
    const [mensaje, setMensaje] = React.useState("")

    const superagent = require('superagent');

    React.useEffect(() => {
        const urlFinal = url + idCliente + "/mensajes"
        const fetchApi = async () => {
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                if(responseJSON){
                    setMensajes(responseJSON)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
        return () => {
        }
    },[idCliente])

    const cargarMsg = async() => {
        const urlFinal = url + idCliente + "/mensajes"
        try {
            const response = await fetch(urlFinal)
            const responseJSON = await response.json()
            if(responseJSON){
                setMensajes(responseJSON)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        var id = null
        if(auth.currentUser){
            id = auth.currentUser.uid
        }else{
            id = idCliente
        }
        const urlFinal = url + "anadir-mensaje"
        await superagent.post(urlFinal)
                .send({ 
                    msg: mensaje,
                    fecha: new Date(),
                    id: id,
                    idCliente: idCliente
                    })
                .then(() => {

            })
        cargarMsg()
        setMensaje('');
      }


    return (
        <div>
            <h2 className="text-info text-center">Mensajes</h2>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {mensajes.length > 0 ? (
                            mensajes.map((value, index) => {
                                return <div key={index} className={value.id === idCliente ? ("containerMsg"):"containerMsg info"}>
                                    <img 
                                        src={value.id === idCliente ? (imgCliente):imgCuidador} 
                                        align={value.id === idCliente ? ("left"):"right"}
                                        width="5%" 
                                        alt="Avatar"/>
                                    <div className={value.id === idCliente ? ("border-info"):"border-info"}>
                                        <div className={value.id === idCliente ? ("text-left ml-5"):"text-right mr-5"}>{value.msg}</div>
                                    </div>
                                    <br/>
                                    <div className={value.id === idCliente ? ("time-right"):"time-left"}>{value.fecha.substr(0, 10)} a las {value.fecha.substr(11, 8)}</div>
                                </div>
                            })
                        ):null}
                        <form className="form-group text-center" onSubmit={sendMessage}>
                            <input className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe un mensaje" />
                            <button className="btn btn-info mt-1 form-control" type="submit" disabled={!mensaje}>enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mensajeria
