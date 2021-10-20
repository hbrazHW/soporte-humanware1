import React from 'react'

export const GlobalFilter = ({filter, setFilter}) => {
    return (
        <input type="text" className="form-control color-header border-white buscador-radius-derecha" placeholder="Buscar..." value={filter || ''} onChange={(e) => setFilter(e.target.value)}/>
    )
}

