import React from 'react'

export const CuidadorContext = React.createContext()

const DatosCuidador = (props) => {

    const [cuidador, setCuidador] = React.useState([])

    React.useEffect(() => {
        if(localStorage.getItem('cuidador')){
            const cuidadorLocal = JSON.parse(localStorage.getItem('cuidador'))
            setCuidador(cuidadorLocal)
        }
    }, [])

    const actualizarCuidador = (valor) => {
        if(valor){
            setCuidador(valor)
            localStorage.setItem('cuidador', JSON.stringify(valor))
        }else{
            localStorage.clear()
        }
        
    }

    return (
        <CuidadorContext.Provider value={{cuidador, actualizarCuidador}}>
            {props.children}
        </CuidadorContext.Provider>
    )
}

export default DatosCuidador
