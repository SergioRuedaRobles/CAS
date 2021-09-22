import React from 'react'
import {auth, url} from '../firebase'
import {withRouter, Link} from 'react-router-dom'
import ViewCalendar from './ViewCalendar'

const Cuidador = (props) => {

    const [clientes, setClientes] = React.useState([])
    const [selected, setSelected] = React.useState([])

    const idCuidador = auth.currentUser.uid

    let urlFinal = url + "clientes/" + idCuidador

    React.useEffect(() => {
        if(auth.currentUser){
            const fetchApi = async () => {
                try {
                    const response = await fetch(urlFinal)
                    const responseJSON = await response.json()
                    if(responseJSON){
                        setClientes(responseJSON)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchApi()
            return () => {
            }
        }else{
            props.history.push('/login')
        }
        
    }, [props.history, urlFinal])

    const goToAñadirPaciente = () => {
        props.history.push('/nuevo-paciente')
        cargarClientes()
    }

    const cargarClientes = async () => {
        try {
            const response = await fetch(url)
            const responseJSON = await response.json()
            if(responseJSON){
                setClientes(responseJSON)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const verCalendario = (cliente) => {
        const select = clientes.slice()
        select.map((value, index) => {
            if(cliente === index){
                return select[index] = true
            }else{
                return select[index] = false
            }
        })
        setSelected(select)
    }

    return (
            <div>
                <div className="mt-5 container">
                    <div className="row">
                        <div className="col-sm">
                        <button onClick={() => goToAñadirPaciente()} className="btn btn-primary">+ Añadir cliente</button>
                        </div>
                        <div className="col-sm">
                            <h2 className="text-info font-weight-bold">Gestionar Clientes</h2>
                        </div>
                        <div className="col-sm text-right">
                            <Link className="btn btn-primary" to={`/medicamentos/${idCuidador}`}>Medicamentos</Link>
                        </div>
                    </div>
                </div>
                
                { clientes.length <= 0 || clientes === null? (
                    "No hay clientes que mostrar"
                ):
                clientes.map((value, index) => {
                    return <div key={index}>
                            <div className="card mb-2" key={index+1}>
                                <div className="card-body" key={index+2}>
                                <div className="container mt-1">
                                    <div className="row">
                                    <div className="col-sm">
                                    <div className="text-left mb-3 float-left">
                                        <h5><Link className="font-weight-bold text-info text-uppercase mr-5" to={`/info-cliente/${value.id}`}>{value.nombre + " " + value.apellidos}</Link></h5>
                                        <button className="btn btn-info" onClick={() => verCalendario(index)}>Ver tomas</button>
                                        <Link className="btn btn-info ml-1" to={`/anadir-toma/${value.id}`}>
                                            Añadir toma
                                        </Link>
                                        <Link className="btn btn-info ml-1" to={`/zona-control/${value.id}`}>
                                            Definir zona de control
                                        </Link>
                                    </div>
                                    </div>
                                    <div className="col-sm">
                                    {value.info !== undefined? (
                                        <div className="text-left">
                                            <h5 className="card-subtitle mb-2 text-info" key={index+4}><b>Peso:</b> {value.info.peso} kg</h5>
                                            <h5 className="card-subtitle mb-2 text-info" key={index+6}><b>Presión sanguínea:</b> {value.info.presionMax}/{value.info.presionMin} mmHg</h5>
                                            <h5 className="card-subtitle mb-3 text-info" key={index+5}><b>Nivel de glucosa:</b> {value.info.glucosa} mg/dl</h5>
                                        </div>
                                    ):<div className="text-info">No se ha tomado medidas</div>}
                                    </div>
                                    </div>
                                </div>
                                    {
                                        selected[index] ? (
                                            <ViewCalendar cuidador={auth.currentUser.email} cliente={value.id}/>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
    )
}

export default withRouter(Cuidador)