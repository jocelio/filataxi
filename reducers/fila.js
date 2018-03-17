import { GET_FILA } from "../actions/fila";


export default (state = [], action) => {

    switch (action.type) {

        case GET_FILA:
            return {...state, filaList: action.payload.data}

        default:
            return state;

    }

};
