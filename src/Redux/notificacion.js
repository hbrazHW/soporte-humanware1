//constantes
const dataInicial = {
    loading: false,
    correcto: false
}

//Types
const LOADING = 'LOADING'
const CORRECTO = 'CORRECTO'

//Reducer
export default function notificacionReducer(state = dataInicial, action){
    switch (action.type) {
        case CORRECTO:
            return {...state, loading: false, correcto: true}
        default: 
            return {...state}
    }
}

//Actions
export const notificacionPush = () => async (dispatch) =>{
    dispatch({
        type: CORRECTO
    })
}
