import React from 'react';
import GoogleMapReact from 'google-map-react';
import img from '../images/marca.png';
import {url} from '../firebase'
import {withRouter} from 'react-router-dom'

const ImgComponent = () => <img src={img} alt="marca" width="30"/>

const SimpleMap = (props) => {

    const superagent = require('superagent');

    const [coordenadas, setCoordenas] = React.useState({
        lat: 0,
        lng: 0,
        x: 0,
        y: 0
    })

    const [marcado, setMarcado] = React.useState(false)
    const [radio, setRadio] = React.useState(0)

    const defaultProps = {
        center: {
            lat: 36.7157414,
            lng: -4.4296901
        },
        zoom: 15
    };

    const _onClick = ({x, y, lat, lng, event}) => {
        setCoordenas({lat, lng, x, y})
        setMarcado(true)
    }
    // ES5 users

    const confirmarZona = async(e) => {
        const urlFinal = url + "control"
        try{
            await superagent.post(urlFinal)
                .send({ 
                    lat: coordenadas.lat,
                    lng: coordenadas.lng,
                    radio: radio,
                    idCliente: props.idCliente
                })
                .then(() => {
                    props.history.push('/cuidador')
            })
            props.history.push('/cuidador')
        } catch(error){
            console.log(error)
        }
    }

    return (
      // Important! Always set the container height explicitly
      <div>
        A continuación vas a definir un radio para el control del cliente.<br/>
        1º - Establece el punto central pinchando en el mapa
        {marcado ? (
            <div>
                2º - Introduce un radio de control en metros: <br/>
                <input className="mt-2" type="number" onChange={e => setRadio(parseInt(e.target.value))} value={radio}/>
                <button className="btn btn-info ml-2" type="submit" onClick={() =>confirmarZona()}>
                    Confirmar selección
                </button>
            </div>
        ):null}
        <div className="mt-2" style={{ height: '80vh', width: '100%' }}>
        
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBtApXxr0sVPQp3rJ5ZpaVjnTRoY8cLj-E", language: 'es' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={_onClick}
            >
                <ImgComponent
                    lat={coordenadas.lat}
                    lng={coordenadas.lng}
                />
            </GoogleMapReact>
        </div>
      </div>
    );
}


export default withRouter(SimpleMap);