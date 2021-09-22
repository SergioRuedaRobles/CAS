import React from 'react'
import {useParams, Link} from 'react-router-dom'
import AditionalInfoCustomer from './AditionalInfoCustomer'
import ViewCalendar from './ViewCalendar'
import { CuidadorContext } from '../context/DatosCuidador'
import AlertTomas from './AlertTomas'
import AlertaZona from './AlertaZona'
import { auth, url } from '../firebase'

const Cliente = (props) => {

    const {idCliente} = useParams()
    const {cuidador} = React.useContext(CuidadorContext)
    const [infoAdicional, setInfoAdicional] = React.useState({})
    const [currentPosition, setCurrentPosition] = React.useState({})
    const [errorDistancia, setErrorDistancia] = React.useState(0)
    const [superada, setSuperada] = React.useState(false)
    const [numNoLeidos, setNumNoLeidos] = React.useState(0)


    React.useEffect(() => {

        if ("geolocation" in navigator) {
            /* la geolocalización está disponible */
            function success(position){
                setCurrentPosition(position.coords)
            }
            function error(){
                console.log("No es posible obtener tu posición")
            }
            navigator.geolocation.getCurrentPosition(success, error)
          } else {
            /* la geolocalización NO está disponible */
            console.log("Geolocalización no disponible")
        }
        
        const cargarInfo = async () => {
            const urlFinal = url + "cliente/" + idCliente
            
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                if(responseJSON){
                    setInfoAdicional(responseJSON)
                }
            } catch (error) {
                console.log(error)
            }
        }
        cargarInfo()

        const cargarMensajesNoLeidos = async () => {
            const urlFinal = url  + idCliente + "/mensajes-no-leidos"
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                if(responseJSON){
                    if(auth.currentUser){
                        setNumNoLeidos(responseJSON.filter(m => m.id === idCliente).length)
                    }else{
                        setNumNoLeidos(responseJSON.filter(m => m.id === infoAdicional.idCuidador).length)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        cargarMensajesNoLeidos()

        //distancia (A, B) = R * arccos (sen (LATA) * sen (LATB) + cos (lata) * cos (LATB) * cos (LonA-LonB)) 
        const getKilometros = function(lat1,lon1,lat2,lon2)
        {
            const rad = function(x) {
                return x*Math.PI/180;
            }
            var R = 6378.137; //Radio de la tierra en km
            var dLat = rad( lat2 - lat1 );
            var dLong = rad( lon2 - lon1 );
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return d.toFixed(3); //Retorna tres decimales
        }
        if(infoAdicional.zonacontrol){
            setErrorDistancia(getKilometros(currentPosition.latitude, currentPosition.longitude, infoAdicional.zonacontrol.lat, infoAdicional.zonacontrol.lng))
            if(errorDistancia > parseInt(infoAdicional.zonacontrol.radio)){
                setSuperada(true)
            }
            //console.log(getKilometros(currentPosition.latitude, currentPosition.longitude, infoAdicional.zonacontrol.lat, infoAdicional.zonacontrol.lng))
        }
        return (() =>{
            
        })
        // eslint-disable-next-line
    }, [idCliente])
    
    return (
        <div>
            { 
                localStorage.getItem('sesionCliente') <= 0 ? (
                    window.location.href = window.location + "/login"
                ): 
                <>
                    {infoAdicional?.zonacontrol ? (
                        <AlertaZona superada={superada}/>
                    ):null}
                    <div data-testid="div1" className="mt-3">
                        <AlertTomas cliente={idCliente}/>
                    </div>
                    <div>
                        <div className="float-right">
                            <Link 
                                className="btn btn-info" 
                                to={`/mensajeria/${idCliente}`}>

                                Chat con el cuidador<br/>
                                <div className="textBtnChat">
                                    {numNoLeidos === 1 ? (
                                        <div>{numNoLeidos} mensaje no leido</div>
                                    ): numNoLeidos > 1 ? (
                                        <div>{numNoLeidos} mensajes no leidos</div>
                                    ):null}
                                </div>
                            </Link>
                        </div>
                        <div data-testid="div2" className="mt-2">
                            <AditionalInfoCustomer idCliente={idCliente} cliente={infoAdicional}/>
                        </div>
                        
                    </div>
                    
                    <div data-testid="div3" className="mt-4">
                        {cuidador ? (
                            <div>
                                <ViewCalendar cliente={idCliente}/> 
                            </div>
                        ): null}
                    </div>
                    
                </>
            }
        </div>
    )
}

export default Cliente
