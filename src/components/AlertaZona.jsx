import React from 'react'
import Alert from 'react-bootstrap/Alert'

const AlertaZona = (props) => {

    const [show, setShow] = React.useState(true)
    
    return (
        <div data-testid="div1">
           {show && props.superada ? (
                <Alert key={3424} variant="danger" onClose={() => setShow(false)} dismissible>
                    Atención, está saliendo de su zona
                </Alert>
            ): null} 
        
        </div>
    )
}

export default AlertaZona
