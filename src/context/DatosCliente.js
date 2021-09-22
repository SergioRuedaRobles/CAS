import React from 'react'

export const ClienteContext = React.createContext()

const DatosCliente = (props) => {

    const [cliente, setCliente] = React.useState([])

    React.useEffect(() => {
        if(localStorage.getItem('sesionCliente')){
            const clienteLocal = JSON.parse(localStorage.getItem('sesionCliente'))
            setCliente(clienteLocal)
        }
    }, [])

    const actualizarCliente = (valor) => {
        if(valor){
            setCliente(valor.id)
            localStorage.setItem('sesionCliente', JSON.stringify(valor.id))
        }else{
            localStorage.clear()
        }
        
    }

    return (
        <ClienteContext.Provider value={{cliente, actualizarCliente}}>
            {props.children}
        </ClienteContext.Provider>
    )
}

export default DatosCliente
