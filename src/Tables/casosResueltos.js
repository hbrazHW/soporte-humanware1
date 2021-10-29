import Moment from 'moment'
import React from 'react'
import SeleccionarFila from './SeleccionarFila'


export const CASOSRESUELTOS = [
    {
        Header: 'Titulo',
        footer: 'Titulo',
        accessor: 'title',
    },
    
    {
        Header: 'Nro. de Ticket',
        footer: 'Nro. de Ticket',
        accessor: 'ticketnumber',
    },

    {
        Header: 'Asunto',
        footer: 'Asunto',
        accessor: 'subjectid',
       

    },
    
    
    {

      Header:  'Fecha de Resolución',
      footer: 'Fecha de Resolución',
      accessor:'new_fechaderesolucion',
      Cell: ({ value }) => { return value ? Moment(value).format('L h:mm') : '-' }
     

    },

     {
        Header: "Descripción de la Resolución",
         footer: "Descripción de la Resolución",
        acessor: "new_descripciondelaresolucion",

      },
     
       
    {
        Header: 'Estado',
        footer: 'Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case '1':
                    return 'aceptado'
                case '2':
                    return 'Rechazado' 
           
            }
        }
    },
    {
        accessor: 'incidentid',
        Cell: ({ value }) => {
            return (
                <SeleccionarFila value={value} />
            )
        }
    }
]


