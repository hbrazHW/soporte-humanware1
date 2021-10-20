import React from 'react'
import Divisa from '../Tables/Divisa'

export const COLUMNS2 = [
    {
        Header: 'Divisa',
        footer: 'Divisa',
        accessor: '_transactioncurrencyid_value',
        Cell: ({ value }) => {
            return (
                <Divisa id={value} />
            )
        }
    },
    {
        Header: 'Tope por Línea Comercial',
        footer: 'Tope por Línea Comercial',
        accessor: 'new_topeporlineacomercial',
        Cell: ({ value }) => { return <p className="text-success m-0">$ {Intl.NumberFormat().format(value)} </p> }
    },
    {
        Header: 'Tope por Línea Comercial USD',
        footer: 'Tope por Línea Comercial USD',
        accessor: 'new_topeporlineacomercialusd',
        Cell: ({ value }) => { return <p className="text-success m-0">$ {Intl.NumberFormat().format(value)} </p> }
    },
    {
        Header: 'Monto Utilizado General',
        footer: 'Monto General',
        accessor: 'new_montoutilizadogeneral',
        Cell: ({ value }) => { return <p className="text-success m-0">$ {Intl.NumberFormat().format(value)} </p> }
    },
    {
        Header: 'Monto Disponible General',
        footer: 'Monto Operación',
        accessor: 'new_montodisponiblegeneral',
        Cell: ({ value }) => { return <p className="text-success m-0">$ {Intl.NumberFormat().format(value)} </p> }
    }, 
    {
        Header: 'Razón para el Estado',
        footer: 'Razón para el Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case '1':
                    return 'Inicial'
                    break;
                case '100000000':
                    return 'Aprobada'
                    break;
                case '100000001':
                    return 'Instrumentada'
                    break;
                default:
                    return '---'
                    break;
            }
        }
    }
]
