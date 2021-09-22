import React from 'react'
import SimpleMap from './SimpleMap'
import { useParams } from 'react-router'
import {url} from '../firebase'

const ZonaControl = (props) => {

    const {idCliente} = useParams()
    const [cliente, setCliente] = React.useState({})

    React.useEffect(() => {
        const urlFinal = url + "cliente/" + idCliente
        const fetchApi = async () => {
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                if(responseJSON){
                    setCliente(responseJSON)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
        return () => {
        }
    }, [idCliente])
    
    return (
        <div>
            <h3 className="text-info">Define la zona de control para {cliente.nombre} {cliente.apellidos}</h3>
            <SimpleMap idCliente={idCliente}/>
        </div>
    )
}

export default ZonaControl
