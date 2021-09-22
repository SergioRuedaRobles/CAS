import React from 'react'

const TomaFueraTiempo = (props) => {

    const error = <div className="text-uppercase text-danger font-weight-bold">Pasado el tiempo de la toma</div>
    const valido = <div className="text-uppercase text-success font-weight-bold">A tiempo para la toma</div>
    const cuidado = <div className="text-uppercase text-warning font-weight-bold">Solo quedan {props.toma.hora.split(":")[1] - (new Date().getMinutes())} minutos para la toma</div>

    const [fecha, setFecha] = React.useState({
        dia: "",
        mes: "",
        año: ""
    })
    const [horaMin, setHoraMin] = React.useState({
        hora: "",
        min: ""
    })
    const [dateActual, setDateActual] = React.useState({
        dia: "",
        mes: "",
        año: "",
        hora: "",
        min: ""
    })

    React.useEffect(() => {
        setFecha({
            dia: props.fechaToma.split("-")[2],
            mes: props.fechaToma.split("-")[1],
            año: props.fechaToma.split("-")[0]
        })
        setHoraMin({
            hora: props.toma.hora.split(":")[0],
            min: props.toma.hora.split(":")[1]
        })
        setDateActual({
            dia: (new Date().getDate()),
            mes: (new Date().getMonth()+1),
            año: (new Date().getFullYear()),
            hora: (new Date().getHours()),
            min: (new Date().getMinutes())
        })
    }, [props.fechaToma, props.toma.hora])

    return (
        <div>
            {
                (() => {
                    if(fecha.año < dateActual.año)
                        return error
                    else
                        if(fecha.mes < dateActual.mes && fecha.año <= dateActual.año)
                            return error
                        else
                            if(fecha.dia < dateActual.dia && fecha.mes <= dateActual.mes)
                                return error
                            else
                                if(horaMin.hora < dateActual.hora && fecha.dia <= dateActual.dia && fecha.mes <= dateActual.mes)
                                    return error
                                else
                                    if(horaMin.min < dateActual.min && horaMin.hora <= dateActual.hora && fecha.dia <= dateActual.dia && fecha.mes <= dateActual.mes)
                                        return error
                                    else
                                        if(dateActual.min - horaMin.min <= 30 && horaMin.min >= dateActual.min && horaMin.hora >= dateActual.hora && fecha.dia >= dateActual.dia && fecha.mes >= dateActual.mes)
                                            return cuidado
                                        else
                                            return valido
                })()
            }
        </div>
    )
}

export default TomaFueraTiempo
