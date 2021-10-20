import Moment from 'moment'
import React from 'react'
import SeleccionarFila from '../Tables/SeleccionarFila'


export const COLUMNS = [
    {
        Header: 'Titulo',
        footer: 'Titulo',
        accessor: 'title'
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
        // Cell: ({value}) => {
        //       switch (value) {
        //           case '1':
        //               return 'Consulta'
        //          case '2':
        //             return 'Error'   
        //           case '3':
        //            return 'Nuevo Requerimiento'     

        //      }
        //  }



    },

    /*{
        Header: 'Prioridad',
        footer: 'Prioridad',
        accessor: 'prioritycode',
        Cell: ({ value }) => {
            switch (value) {
                case '1':
                    return <button className="btn btn-warning float-right">Alta</button>
                case '2':
                    return <button className="btn btn-secundary float-right">Normal</button>
                case '3':
                    return <button className="btn btn-primary float-right">Baja</button>
            }
        }
    },*/

    {
        Header: 'Fecha de Creación',
        footer: 'Fecha de Creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? Moment(value).format('L h:mm') : '-' }
    },
    
    {
      Header:  'Fecha de Resolución',
      footer: 'Fecha de Resolución',
      accessor:''


    },



    {
        Header: 'Estado',
        footer: 'Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case '1':
                    return 'En curso'
                case '2':
                    return 'Retenido' //Rojo #D43900
                case '3':
                    return 'Esperando detalles' //Violeta #8C24B5
                case '4':
                    return 'Investigación' //Verde #007A7C prioritycode
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


