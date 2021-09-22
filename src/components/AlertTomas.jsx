import React from 'react'
import Alert from 'react-bootstrap/Alert'
import {url} from '../firebase'

const AlertTomas = (props) => {

    const [mensaje, setMensaje] = React.useState("")
    // eslint-disable-next-line
    const [show, setShow] = React.useState(true)
    const [tomasNC, setTomasNC] = React.useState([])

    React.useEffect(() => {
        const urlFinal = url + props.cliente + "/tomas-caducadas/"
        const fetchApi = async () => {
            try {
                const response = await fetch(urlFinal)
                const responseJSON = await response.json()
                setTomasNC(responseJSON)
                if(responseJSON.length > 0){
                    setMensaje("Se ha saltado alguna toma, revise su calendario, y avise a su cuidador")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
        
    }, [props.cliente])

    return (
        <div data-testid="div1">
            {show && tomasNC.length > 0 ? (
                <Alert key={3424} variant="danger" onClose={() => setShow(false)} dismissible>
                    {mensaje}
                </Alert>
            ): null}
            
        </div>
    )
}

export default AlertTomas
