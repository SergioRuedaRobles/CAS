import React, { Fragment } from 'react'
import TomaFueraTiempo from './TomaFueraTiempo'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {withRouter} from 'react-router-dom'
import {url} from '../firebase'

const Toma = (props) => {

    const [toma, setToma] = React.useState({ 
        hora: "",
        fecha: "",
        medicamento: "",
        cantidad: "",
        mensaje: "",
        confirmada: false,
        id: ""
    })
    const [show, setShow] = React.useState(false);
    const [idToma, setIdToma] = React.useState();
    const [confirmada, setConfirmada] = React.useState()

    const superagent = require('superagent');
    const clienteLocal = JSON.parse(localStorage.getItem('sesionCliente')) || null

    React.useEffect(() => {
        setToma(props.toma)
        setConfirmada(props.toma.confirmada)
        return () => {
            //limpieza
        }
    }, [props.toma, toma])

    const confirmarToma = async() => {
        const urlFinal = url + "actualizar-toma"
        setIdToma(toma.id)
        setShow(true)
        setConfirmada(true)
        if(!toma.confirmada){
            try {
                await superagent.post(urlFinal)
                .send({ 
                        confirmada: true,
                        idCliente: props.idCliente,
                        idToma: toma.id
                    })
                .then(() => {
                    setTimeout(res, 2000)
            })
            } catch (error) {
                console.log(error)
            }
        }        
    }

    function res (){
        window.location.replace('');
    }

    return (
        <div>
        { 
            toma ? (
                <Fragment>
                    <TomaFueraTiempo fechaToma={props.fecha} toma={props.toma}/>
                    Medicamento: {toma.medicamento}
                    <br/>
                    Dosis: {toma.cantidad} {" "} unidades 
                    <br/>
                    Hora de la toma: {toma.hora}
                    <br/>
                    Mensaje adjunto: {toma.mensaje}
                    <br/>
                    <div className= {
                        !confirmada ? (
                            "font-weight-bold"
                        ): "font-weight-bold text-success"
                    }>Toma confirmada: {!confirmada ? (
                        "no"
                    ): "si"
                    }</div>
                    <p/>
                    <Alert show={show && toma.id === idToma} variant="success">
                        Has confirmado la toma
                    </Alert>
                    { ((clienteLocal === null && !toma.confirmada) || 
                        (clienteLocal !== null && !toma.confirmada && 
                        toma.fecha.split("-")[2] >= new Date().getDate())) ? ( 
                        <Button onClick={() => confirmarToma(toma)}>
                            Confirmar toma
                        </Button>):null}
                    <hr/>
                </Fragment>
            ):null
        }
            
        </div>
    )
}

export default withRouter(Toma)
