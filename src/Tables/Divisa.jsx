import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerDivisas } from '../Redux/Divisa'

const Divisa = ({id}) => {
    const dispatch = useDispatch()
    const [divisa, setDivisa] = React.useState('---')
    const [divisas, setDivisas] = React.useState([]) 
    const [llamada, setLlamada] = React.useState(false)
    const divisasSelector = useSelector(store => store.divisas.divisas)

    React.useEffect(async () => {
        debugger;
        if(divisasSelector.length > 0){
            if(divisasSelector.length > 0){
                divisasSelector.filter(divi => divi.transactioncurrencyid == id).map(item => {
                    setDivisa(item.currencyname)
                })
            }
        }else if(divisasSelector.length === 0 && llamada === false){
            setLlamada(true)
            await dispatch(obtenerDivisas())
        }
    }, [divisasSelector])

    return (
        <p className="m-0 texto-lista m-0">{divisa}</p> 
    )
}

export default Divisa
