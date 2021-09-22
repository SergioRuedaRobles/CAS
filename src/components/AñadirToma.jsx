import React from 'react'
import {auth, url} from '../firebase'
import {withRouter, useParams} from 'react-router-dom'

const AñadirToma = (props) => {
    const superagent = require('superagent');

    const [fecha, setFecha] = React.useState(new Date())
    const [hora, setHora] = React.useState("00:00")
    const [medicamento, setMedicamento] = React.useState("")
    const [cantidad, setCantidad] = React.useState(0)
    const [mensaje, setMensaje] = React.useState("")
    const [numDiario, setNumDiario] = React.useState("")
    const [diff, setDiff] = React.useState(0)
    const [medicamentos, setMedicamentos] = React.useState([])
    //const [diasSelected, setdiasSelected] = React.useState(new Array(dias.length).fill(false))


    React.useEffect(() => {
        if(auth.currentUser){
            const fetchApi = async () => {
                const urlFinal = url + auth.currentUser.uid + "/medicamentos"
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
            return (() => {
            })
        }else{
            console.log('No existe usuario')
            props.history.push('/login')
        }
    }, [props.history]) 

    const procesarRegistro = e => {
        e.preventDefault()//evita las redirecciones get por defecto
        crearToma()
        props.history.push('/cuidador')
    }

    const {idCliente} = useParams()

    const crearToma = async() => {
        const urlFinal = url + "anadir-toma"
        try{
            await superagent.post(urlFinal)
                .send({ 
                    hora: hora,
                    fecha: fecha,
                    medicamento: medicamento,
                    cantidad: cantidad,
                    mensaje: mensaje,
                    confirmada: false,
                    idCliente: idCliente,
                    numDiario: numDiario,
                    diff: diff
                })
                .then(() => {
                    props.history.push('/cuidador')
            })
        } catch(error){
            console.log(error)
        }
    }


    return (
        <div>
            <form data-testid="form-at" onSubmit={procesarRegistro} key="f1">
                <label key="l1" className="text-info">Fecha de la toma</label> 
                <input 
                    key="i1"
                    className="form-control"
                    placeholder="Ingrese ua fecha"
                    type="date"
                    onChange={e => setFecha(e.target.value)}
                    value={fecha}
                />
                <p/>
                <label key="l2" className="text-info">Hora de la toma</label>
                <input 
                    key="i2"
                    className="form-control"
                    placeholder="Ingrese apellidos"
                    type="time"
                    onChange={e => setHora(e.target.value)}
                    value={hora}
                />
                <p/>
                <label key="l3" className="text-info">Medicamento</label>
                <div className="input-group mb-3">
                    <select onChange={e => setMedicamento(e.target.value)} value={medicamento} className="custom-select" id="inputGroupSelect01">
                        <option disabled value="">Elige un medicamento</option>
                        {medicamentos.length > 0 ? (
                            medicamentos.map((value) => {
                                return <option key={value.nombre} value={value.nombre}>
                                    {value.nombre}
                                </option>
                            })
                        ):null}
                    </select>
                </div>

                <p/>
                <label key="l4" className="text-info">Cantidad o dosis</label>
                <input 
                    key="i4"
                    className="form-control"
                    type="number"
                    placeholder="Ingrese la cantidad o la dosis de la toma"
                    onChange={e => setCantidad(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={cantidad}
                />
                <p/>
                <label key="l5" className="text-info">Mensaje</label>
                <input 
                    key="i5"
                    className="form-control"
                    placeholder="Ingrese un mensaje"
                    onChange={e => setMensaje(e.target.value)}
                    value={mensaje}
                />
                <p/>
                <label key="l6" className="text-info">Cuantas veces se repite al día</label>
                <input 
                    key="i6"
                    className="form-control"
                    placeholder="Por defecto, una vez"
                    onChange={e => setNumDiario(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={numDiario}
                />
                <p/>
                <label key="l7" className="text-info">Horas de diferencia entre cada toma</label>
                <input 
                    key="i7"
                    className="form-control"
                    placeholder="Por defecto, una vez"
                    onChange={e => setDiff(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                    value={diff}
                />
                <p/>
                
                <button className="btn btn-info btn-lg btn-block mt-2" key="bt1" type='submit'>
                    Registrar Toma
                </button>
            </form>
        </div>
    )
}
//para pruebas
//export default AñadirToma
//para produccion
export default withRouter(AñadirToma)
