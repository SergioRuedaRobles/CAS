import React from 'react'
import esfigmomanometro from '../../images/esfigmomanometro-de-bolsillo.jpg'

const InfoPresion = () => {
    return (
        <div>
            <h2 className="mt-3 text-info">¿Cómo tomar la tensión?</h2>
            <div>
                <p className="text-justify">Para tomar la tensión es necesario un esfigmomanómetro parecido al de la imagen (puede ser electrónico).
                <br/> Se expresa en dos valores:
                </p>
                <ul>
                    <li type="circle">Tensión máxima o sistólica.</li>
                    <li type="circle">Tensión mínima o diastólica.</li>
                </ul>
                
                <p>
                <b>Pasos:</b>
                    <ol>
                        <li>Será más práctico si está acompañado de alguien que pueda tomarle la presión.</li>
                        <li>Es necesario envolver el brazo por encima del codo con un brazal que suele sujetarse con velcro.</li>
                        <li>Una vez colocado y bien ajustado, se hinchará usando la perilla de goma a modo de bomba de aire.</li>
                        <li>A continuación, se soltará un de aire del brazal, para permitir la circulación.</li>
                        <li>EL primero de los latidos indicará la presión máxima de la sangre, correspondiente con la sístole.</li>
                        <li>Seguiremos deshinchando el brazal hasta que el latido se desvanezca.</li>
                        <li>Cuando el latido desaparezca nos mostrará la presión sanguinea mínima o diastólica.</li>
                    </ol>
                </p>
                
            </div>
            <p/>
            <div className="float-left">
                <img src={esfigmomanometro} className="img-fluid rounded mx-auto d-block" alt="esfigmomanometro" width="50%"/>
                <div className="text-center">Ejemplo de Esfigmomanómetro</div>
            </div>
        </div>
    )
}

export default InfoPresion
