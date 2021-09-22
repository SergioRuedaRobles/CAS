import React from 'react'
import {useParams} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import {url} from '../firebase'


const Medicamentos = () => {

    const {idCuidador} = useParams()

    const [medicamentos, setMedicamentos] = React.useState([])
    const [nombreMed, setNombreMed] = React.useState("")
    const [descMed, setDescMed] = React.useState("")

    const superagent = require('superagent');

    React.useEffect(() => {
        const urlFinal = url + idCuidador + "/medicamentos"
        const fetchApi = async () => {
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                if(responseJSON){
                    setMedicamentos(responseJSON)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
        return () => {
        }
    }, [idCuidador])

    const cargarMedicamentos = async() => {
        const urlFinal = url + idCuidador + "/medicamentos"
        try {
            const response = await fetch(urlFinal)
            const responseJSON = await response.json()
            if(responseJSON){
                setMedicamentos(responseJSON)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const ingresarMedicamento = async (e) => {
        e.preventDefault()
        const idMed = uuidv4();
        const urlFinal = url + "anadir-medicamento"
        await superagent.post(urlFinal)
                .send({ 
                    nombre: nombreMed,
                    descripcion: descMed,
                    idCuidador: idCuidador,
                    id: idMed
                    })
                .then(() => {
            })
        setDescMed("")
        setNombreMed("")
        cargarMedicamentos()
    }

    const borrarMedicina = async (medicina) => {
        const urlFinal = url + "borrar-medicamento"
        try{
            await superagent.delete(urlFinal)
                .send({ idMed: medicina.id, idCuidador: idCuidador})
                .then(() => {
                    cargarMedicamentos()
            })
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className="text-center text-info mt-2">Medicamentos para las tomas</h2>
            <div className="container mt-4 text-info">
                <div className="row">
                    <div className="col ml-5">
                        <h4>Listado de medicamentos</h4>
                        <div>
                            <ul className="mt-4">
                            {medicamentos.length > 0 ? (
                                medicamentos.map((value, index) => {
                                    return <li className="mt-2" key={index}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <b>{value.nombre}:</b><br/> {value.descripcion} 
                                                </div>
                                                <div className="col">
                                                    <button className="btn-sm btn-info ml-3" onClick={() => borrarMedicina(value)}>Borrar</button>
                                                </div>
                                            </div>
                                        </div>
                                            </li>
                                })
                            ): null}
                            </ul>
                        </div>
                    </div>
                    <div className="col mr-5">
                        <h4 className="text-right">Introducir nuevo medicamento</h4>
                        <form onSubmit={ingresarMedicamento}>
                            Nombre: <input 
                                className="form-control"
                                placeholder="Introduce un nombre"
                                onChange={e => setNombreMed(e.target.value)}
                                value={nombreMed}/>
                            <p/>
                            Descripción: <textarea 
                                className="form-control"
                                placeholder="Introduce una descripción"
                                onChange={e => setDescMed(e.target.value)}
                                value={descMed}/>
                            <button className="btn btn-info mt-2 form-control" type="submit" disabled={!nombreMed}>Añadir</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Medicamentos
