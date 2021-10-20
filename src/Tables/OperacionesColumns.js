import Moment from 'moment'
import React from 'react'
import SeleccionarFila from '../Tables/SeleccionarFila'

export const COLUMNS = [
    {
        Header: 'Operación',
        footer: 'Operación',
        accessor: 'new_name'
    },
    {
        Header: 'Nro. de Orden',
        footer: 'Nro. de Orden',
        accessor: 'new_nrooperacion',
    },
    {
        Header: 'Fecha de Envío',
        footer: 'Fecha de Envío',
        accessor: 'new_fechadeenvio',
        Cell: ({ value }) => { return value ? Moment(value).format('L') : '-'}
    },
    {
        Header: 'Destino Fondo',
        footer: 'Destino Fondo',
        accessor: 'new_destinofondos',
        Cell: ({value}) => {switch (value) {
            case '100000000':
                return 'Capital de Trabajo'
                break;
                case '100000007':
                return 'Inmuebles'
                break;
                case '100000005':
                return 'Obra Civil'
                break;
                case '100000003':
                return 'Proyecto de Inversión'
                break;
                case '100000004':
                return 'Refinanciación'
                break;
                case '100000008':
                return 'Regalías por Venta'
                break;
                case '100000002':
                return 'Venta de Semilla Maíz'
                break;
                case '100000001':
                return 'Venta de Semilla Soja'
                break;
                case '100000009':
                return 'Venta de Semilla Trigo'
                break;
                case '100000010':
                return 'Venta de Semilla Cooperador'
                break;
                case '100000011':
                return 'Venta de Semilla Otros'
                break;  
            case '100000006':
                return 'Bienes de Capital'
                break;
            default:
                return 'Tercero'
                break;
        }}
    },
    {
        Header: 'Comisión',
        footer: 'Comisión',
        accessor: 'new_montototalcomision',
        Cell: ({ value }) => { return <p className="text-success m-0 fw-bolder texto-lista m-0">$ {Intl.NumberFormat().format(value)} </p> }
    },
    {
        accessor: 'new_operacionid',
        Cell: ({ value }) => {
            return (
                <SeleccionarFila value={value} />
            )
        }
    }
]


