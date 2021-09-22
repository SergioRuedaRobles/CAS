import React, { Fragment } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom'
import Toma from './Toma';
import tomaConfirmada from '../images/confirmada.png'
import tomaNoConfirmada from '../images/no-confirmada.png'
import Alert from 'react-bootstrap/Alert'
import {url} from '../firebase'

const ViewCalendar = (props) => {

  const [value, onChange] = React.useState(new Date());
  const [tomasDia, setTomasDia] = React.useState([])
  const [tomas, setTomas] = React.useState([])
  const [fechaCOM, setFechaCOM] = React.useState(new Date())
  const [show, setShow] = React.useState(true)
  const [pendientes, setPendientes] = React.useState([])

  const formatearFecha = (year, month, day) => {
    let fecha = ""
    if(month<10){
      fecha = year + '-0' + month
    }else{
      fecha = year + '-' + month
    }
    if(day<10){
      fecha = fecha + '-0' + day
    }else{
      fecha = fecha + '-' + day
    }
    return fecha
  }

  const buscarToma = async (dateSelected) => {
    const daySelected = dateSelected.getDate()
    const monthSelected = dateSelected.getMonth()+1
    const yearSelected = dateSelected.getFullYear()
    const fecha = formatearFecha(yearSelected, monthSelected, daySelected)
    setFechaCOM(fecha)

    const urlFinal = url + props.cliente + "/tomas/" + fecha

    const fetchApi = async () => {
      try {
          const response = await fetch(urlFinal)
          const responseJSON = await response.json()
          if(responseJSON){
              setTomasDia(responseJSON)
          }
      } catch (error) {
          console.log(error)
      }
    } 
    fetchApi()
  }

  React.useEffect(() => {

    const urlFinal = url + props.cliente + "/tomas/"

    const fetchApi = async () => {
      try {
          const response = await fetch(urlFinal)
          const responseJSON = await response.json()
          if(responseJSON){
              setTomas(responseJSON)
          }
      } catch (error) {
          console.log(error)
      }
    } 
    fetchApi()
  },[props.cliente])

  React.useEffect(() => {
    setPendientes(tomas.filter(t=>!t.confirmada))
  }, [tomas])
  
  return (
    <div>
      <div className="container mt-1">
            <div className="row">
              <div className="col-sm text-center">
              <h3 className="text-info text-left ml-4">Revisa tus tomas</h3>
                <div className="ml-4">
                  <Calendar
                    tileContent={({ date, view }) => {
                      if(tomas.find(t=>
                        ((t.fecha.split("-")[2].split("0")[1]===date.getDate()+"" 
                        && t.fecha.split("-")[1].split("0")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+"") 
                        || (t.fecha.split("-")[2]===date.getDate()+"" 
                        && t.fecha.split("-")[1].split("0")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+"")
                        || (t.fecha.split("-")[2]===date.getDate()+"" 
                        && t.fecha.split("-")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+""))
                        && !t.confirmada)){
                        return <div>
                                <b/>
                                <img align="left" src={tomaNoConfirmada} alt="no-confirmada"/>
                              </div>
                      }else if(tomas.find(
                        (t=>t.fecha.split("-")[2].split("0")[1]===date.getDate()+""
                        && t.fecha.split("-")[1].split("0")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+"")
                        || (t=>t.fecha.split("-")[2]===date.getDate()+""
                        && t.fecha.split("-")[1].split("0")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+"")
                        || (t=>t.fecha.split("-")[2]===date.getDate()+""
                        && t.fecha.split("-")[1]===date.getMonth()+1+""
                        && t.fecha.split("-")[0]===date.getFullYear()+""))){
                        return <div>
                                <b/>
                                <img align="left" src={tomaConfirmada} alt="confirmada"/>
                              </div>
                      }
                    }}
                    onChange={onChange}
                    value={value}
                    defaultView="month"
                    onClickDay={(value, event) => buscarToma(value)}
                  />
                </div>
                {props.cuidador ? (
                  <div className="mt-2 text-left ml-4">
                    <Link className="btn btn-info" to={`/historial/${props.cliente}`}>
                        Historial de tomas
                    </Link>
                  </div>
                ):null}
                <div className="mt-2">
                  {show && pendientes.length > 0 && props.cuidador ? (
                    <Alert key={4353} variant="warning" onClose={() => setShow(false)} dismissible>
                        <p>¡El cliente tiene {pendientes.length} tomas pendientes!</p>
                    </Alert>
                  ):null}
                </div>
              </div>
              <div className="col-sm">
              <h3 className="text-info">Tomas</h3>
              {
                tomasDia.length > 0 ? (
                  <Fragment>
                    {
                      tomasDia.map((value, index) => {
                        return <div key={index}>
                          <Toma cuidador={props.cuidador} toma={value} idCliente={props.cliente} fecha={fechaCOM}/>
                        </div>
                      })
                    }
                  </Fragment>
                ) : "No hay tomas este día"
              }
              </div>
            </div>
          </div>
    </div>
  )
}

export default ViewCalendar