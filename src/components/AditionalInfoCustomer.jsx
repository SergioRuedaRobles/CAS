import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {url} from '../firebase'

const AditionalInfoCustomer = (props) => {

    const [infoAdicional, setInfoAdicional] = React.useState({})
    //const {cliente} = React.useContext(ClienteContext)

    const [peso, setPeso] = React.useState("")
    const [presionSanguineaMax, setPresionSanguineaMax] = React.useState("")
    const [presionSanguineaMin, setPresionSanguineaMin] = React.useState("")
    const [glucosa, setGlucosa] = React.useState("")
    const [showEdit, setShowEdit] = React.useState(false)

    const superagent = require('superagent');

    const glucosaBaja = <div className="text-warning"><b>Tiene la glucosa demasiado baja. Por favor, consulte lo antes posible a su médico.</b></div>
    const glucosaAlta = <div className="text-warning"><b>Tiene la glucosa demasiado alta. Por favor, consulte lo antes posible a su médico.</b></div>
    const tensionBaja = <div className="text-warning"><b>Tiene la tensión demasiado baja. Por favor, consulte lo antes posible a su médico.</b></div>
    const tensionAlta = <div className="text-warning"><b>Tiene la tensión demasiado alta. Por favor, consulte lo antes posible a su médico.</b></div>
    const glucosaTensionAltas = <div className="text-warning"><b>Tiene la glucosa y la tensión demasiado altas. Por favor, consulte lo antes posible a su médico.</b></div>
    const glucosaTensionBajas = <div className="text-warning"><b>Tiene la glucosa y la tensión demasiado bajas. Por favor, consulte lo antes posible a su médico.</b></div>

    React.useEffect(() => {
        setInfoAdicional(props.cliente)
    }, [setInfoAdicional, props.cliente])

    const añadirDatos = async () => {
        const urlFinal = url + props.idCliente + "/info"
        try {
            
            await superagent.post(urlFinal)
                .send({ peso: peso, presionMax: presionSanguineaMax, presionMin: presionSanguineaMin, glucosa: glucosa })
                .then(() => {
                    setInfoAdicional({
                        peso: peso,
                        presionMax: presionSanguineaMax,
                        presionMin: presionSanguineaMin,
                        glucosa: glucosa
                    })
                    setShowEdit(!showEdit)
                    props.history.push('/')
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 data-testid="h2-aic" className="text-info">Datos medidos por el paciente</h2>

            {!infoAdicional?.info || showEdit ? (
                <>
                    <form data-testid="form-aic" className="text-info" onSubmit={añadirDatos}>
                        <b>Peso:</b> <input 
                            className="form-control mt-2"
                            placeholder="Ingrese su peso en Kg"
                            onChange={e => setPeso(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                            value={peso}
                        />
                        <b>Presión sanguínea máxima o sistólica:</b> <input 
                            className="form-control mt-2"
                            placeholder="Ingrese la presión sanguínea en mmHg"
                            onChange={e => setPresionSanguineaMax(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                            value={presionSanguineaMax}
                        />
                        <b>Presión sanguínea mínima o diastólica:</b> <input 
                            className="form-control mt-2"
                            placeholder="Ingrese la presión sanguínea en mmHg"
                            onChange={e => setPresionSanguineaMin(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                            value={presionSanguineaMin}
                        />
                        <b>Nivel de glucosa:</b> <input 
                            className="form-control mt-2"
                            placeholder="Ingrese nicel de glucosa en mg/dL"
                            onChange={e => setGlucosa(parseInt(e.target.value) ? parseInt(e.target.value) : '')}
                            value={glucosa}
                        />
                        <button type="button" className="btn btn-info mt-3" onClick={() => añadirDatos()}>Añadir datos</button>
                    </form>
                </>
            ):
            <div data-testid="div1-aic" className="ml-3 text-info">
                <b>Peso:</b> {infoAdicional.info.peso} kg <br/>
                <b>Presión sanguínea:</b> {infoAdicional.info.presionMax}/{infoAdicional.info.presionMin} mmHg 
                <br/>
                <b>Glucosa en sangre:</b> {infoAdicional.info.glucosa} mg/dL <br/>
                {infoAdicional.info.presionMax >= 180 && infoAdicional.info.presionMin >= 120 ? (
                        tensionAlta
                    ):infoAdicional.info.presionMax <= 90 && infoAdicional.info.presionMin <= 60 ? (
                        tensionBaja
                    ):infoAdicional.info.glucosa >= 180 ? (
                        glucosaAlta
                    ): infoAdicional.info.glucosa <= 70 ? (
                        glucosaBaja
                    ):infoAdicional.info.glucosa >= 180 && (infoAdicional.info.presionMax >= 180 && infoAdicional.info.presionMin >= 120) ? (
                        glucosaTensionAltas
                    ):infoAdicional.info.glucosa <=70 && (infoAdicional.info.presionMax >= 90 && infoAdicional.info.presionMin >= 60) ? (
                        glucosaTensionBajas
                    ):null}
            </div>}
            <p/>
            <div data-testid="div2-aic" className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1" onClick={() =>setShowEdit(!showEdit)}>Editar datos</label>
            </div>
            <Link className="text-info ml-1" to={'/info-presion'}>
                    ¿Cómo tomar la tensión?
                </Link>
                <br/><Link className="text-info ml-1" to={'/info-glucosa'}>
                    ¿Cómo medir el nivel de azúcar en sangre?
                </Link>
        </div>
    )
}

//para pruebas
//export default AditionalInfoCustomer
//para producción
export default withRouter(AditionalInfoCustomer)
