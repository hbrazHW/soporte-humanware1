export const COLUMNS = [
    {
        Header: 'Línea (Tipo de Operación)',
        footer: 'Línea (Tipo de Operación)',
        accessor: 'new_lineatipodeoperacion',
        Cell: ({ value }) => {
            switch (value) {
                case '100000000':
                    return 'General'
                    break;
                case '1':
                    return 'Acreedor otro'
                    break;
                case '2':
                    return 'Acreedor socio protector'
                    break;
                case '3':
                    return 'Aval técnico'
                    break;
                case '4':
                    return 'Cheque de Pago Diferido'
                    break;
                case '5':
                    return 'Fideicomiso Financiero'
                    break;
                case '6':
                    return 'Leasing'
                    break;
                case '7':
                    return 'Mercado de futuros y opciones'
                    break;
                case '8':
                    return 'Obligaciones negociables'
                    break;
                case '9':
                    return 'Organismos Internacionales'
                    break;
                case '10':
                    return 'Pagaré bursatil'
                    break;
                case '11':
                    return 'Préstamo'
                    break;
                case '12':
                    return 'Públicas'
                    break;
                case '13':
                    return 'Valores de corto plazo'
                    break;
                default:
                    return '---'
                    break;
            }
        }
    },
    {
        Header: 'Tipo CHPD',
        footer: 'Tipo CHPD',
        accessor: 'new_tipochpd',
        Cell: ({ value }) => {
            switch (value) {
                case '100000000':
                    return 'Propio'
                    break;
                case '100000001':
                    return 'Tercero'
                    break;
                default:
                    return '---'
                    break;
            }
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
        Header: 'Monto Utilizado por Operación',
        footer: 'Monto Utilizado por Operación',
        accessor: 'new_montoutilizadoporoperacion',
        Cell: ({ value }) => { return <p className="text-success m-0">$ {Intl.NumberFormat().format(value)} </p> }
    },
    {
        Header: 'Monto Disponible por Operación',
        footer: 'Monto Disponible por Operación',
        accessor: 'new_montodisponibleporoperacion',
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
