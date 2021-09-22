import React from 'react'

const InfoGlucosa = () => {
    return (
        <div>
            <h2 className="mt-3 text-info">¿Cómo medir el azúcar en sangre?</h2>
            <div>
                <p className="text-justify">Para medir el nivel de azúcar en sangre se utiliza un medidor que mide la cantidad de glucosa en una gota de sangre.
                <br/> Niveles anormales de azúcar en sangre:
                </p>
                <ul>
                    <li type="circle"><b>Hipoglucemia.</b> Conocido como nivel bajo de azúcar en la sangre: 70 mg/dL o menos.</li>
                    <li type="circle"><b>Hiperglucemia.</b> Conocido como nivel alto de azúcar en la sangre: Más de 180 mg/dL.</li>
                </ul>
                
                <p>
                <b>Pasos:</b>
                    <ol>
                        <li>Lávate bien las manos y desinfecta el medidor.</li>
                        <li>Ten a mano el medidor, una tira reactiva, una lanceta y una toallita con alcohol.</li>
                        <li>Frota tus manos para estimular el flujo de sangre a las yemas de los dedos.</li>
                        <li>Enciende el medidor e inserta la tira reactiva.</li>
                        <li>Limpia la yema del dedo con la gasa con alcohol y deja que el alcohol se evapore.</li>
                        <li>Pincha el dedo con la lanceta.</li>
                        <li>Aprieta suavemente la base del dedo hasta que se forme una gota de sangre en la yema del dedo.</li>
                        <li>Coloca la gota de sangre en la tira reactiva.</li>
                        <li>Espera a que el medidor muestre el nivel de azúcar en la sangre.</li>
                        <li>Registra los resultados.</li>
                    </ol>
                </p>
                
            </div>
        </div>
    )
}

export default InfoGlucosa
