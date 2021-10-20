import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { GlobalFilter } from '../Tables/GlobalFilter'
import { useSpring } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

const Tabla = ({ lineas, columnas, titulo }) => {
    const columns = useMemo(() => columnas, [])
    const data = useMemo(() => lineas, [])
    const tituloTabla = useMemo(() => titulo)

    const fade = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1, delay: 1500
        },
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    },
        useGlobalFilter,
        useSortBy,
        usePagination)

    const { globalFilter, pageIndex, pageSize } = state

    React.useState(() => {
        setPageSize(5)
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-5 col-md-9">
                    <h6 className="fw-bolder">{tituloTabla}</h6>
                    <hr className="hr-width hr-principal" />
                </div>
                <div className="col-7 col-md-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text color-header border-white buscador-radius " id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" padding="10px" fill="currentColor" className="bi bi-search text-dark" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

                    </div>
                </div>
            </div>
            <div className="mt-3 card pad bg-dark color-light borde-none shadow-sm">
                <div className="table-responsive w-100">
                    <table {...getTableProps()} className="table table-hover mb-0">
                        <thead className="p-3 table-head">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="h-100 align-items-center">
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-lg-4 p-sm-3 border-0 text-center">
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faArrowDown} className="flechaTabla mx-1" /> : <FontAwesomeIcon icon={faArrowUp} className="flechaTabla mx-1" />) : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} className="w-100 table-body-size overflow-scroll">
                            {page.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className="bg-white w-100 ">
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()} className="text-center">
                                                <p className="text-lowercase p-1 fw-bolder texto-lista texto-tabla m-0">
                                                    {cell.render('Cell')}
                                                </p>
                                            </td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="row p-2 h-100 align-items-center">
                        <div className="col-sm-6">
                            <span className="color-white">
                                Página{' '}
                                <strong>
                                    {pageIndex + 1} de {pageOptions.length}
                                </strong>{' '}
                            </span>
                            {/* {setPageSize(8)} */}
                            {/* <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [5, 15, 15].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select> */}
                        </div>
                        <div className="col-sm-6">
                            <button className="mx-3 btn btn-primary float-right" onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</button>
                            <button className="btn btn-primary float-right" onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tabla
