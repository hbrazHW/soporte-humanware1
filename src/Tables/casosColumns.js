import Moment from 'moment'
import React from 'react'
import SeleccionarFila from '../Tables/SeleccionarFila'


export const COLUMNS = [
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

    
    // {  Header: 'Prioridad',
    //     footer: 'Prioridad',
    //     accessor: 'prioritycode',
    //     Cell: ({ value }) => {
    //         switch (value) {
    //             case '1':
    //                 return <button className="btn btn-danger float-right">Alta</button>
    //             case '2':
    //                 return <button className="btn btn-warning float-right">Normal</button>
    //             case '3':
    //                 return <button className="btn btn-primary float-right">Baja</button>
    //         }
    //     }
    // },


    {

        Header: 'Fecha de Creación',
        footer: 'Fecha de Creación',
        accessor: 'createdon',
        Cell: ({ value }) => { return value ? Moment(value).format('L h:mm') : '-' }
    },
        
    
    
    //  {

    //    Header: 'Fecha de Resolución',
    //    footer: 'Fecha de Resolución',
    //    accessor:'new_fechaderesolucion',
    //    Cell: ({ value }) => { return value ? Moment(value).format('L h:mm') : '-' }
     

    //  },
     
    // //   {
    // //     Header: "Descripción de la Resolución",
    // //      footer: "Descripción de la Resolución",
    // //     acessor: "new_descripciondelaresolucion",

    // //   },
       
    {
        Header: 'Estado',
        footer: 'Estado',
        accessor: 'statuscode',
        Cell: ({ value }) => {
            switch (value) {
                case '1':
                    return 'En curso'
                case '2':
                    return 'Retenido' 
                case '3':
                    return 'Esperando detalles' 
                case '4':
                    return 'Investigación' 
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


