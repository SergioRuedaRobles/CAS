import React from 'react'
import {auth, url} from '../firebase'
import {withRouter, useParams} from 'react-router-dom'
import { Fragment } from 'react'

const Historial = (props) => {

    const [historial, setHistorial] = React.useState([])
    const {idCliente} = useParams()

    let urlFinal = url + "historial/" + idCliente

    React.useEffect(() => {
        if(auth.currentUser){
            const fetchApi = async () => {
                try {
                    const response = await fetch(urlFinal)
                    const responseJSON = await response.json()
                    if(responseJSON){
                        setHistorial(responseJSON)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchApi()
        }else{
            props.history.push('/login')
        }
        return () => {
            //setHistorial(null)
        }
    },[props.history, urlFinal])

    return (
        <div>
        <h3 className="text-center text-info">Historial de tomas</h3>
            {historial.length <=0 ? (
                <div>No hay tomas</div>
            ):
            <Fragment>
                {
                    historial.map((value, index) => {
                        return <div key={index}>
                        <div className="card mb-2" key={index+1}>
                            <div className="card-body" key={index+2}>
                                <h4 className="card-title" key={index+3}>{value.medicamento}</h4>
                                <h5 className="card-subtitle mb-2 text-muted" key={index+4}>Se tomó el {value.fecha} a las {value.hora}</h5>
                                <p className="card-text" key={index+5}>{value.mensaje}</p>
                                Dosis tomada: {value.cantidad}

                            </div>
                        </div>
                    </div>
                    })
                }
            </Fragment>
            }
        </div>
    )
}

export default withRouter(Historial)
