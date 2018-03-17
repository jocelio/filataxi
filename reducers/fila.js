import { GET_FILA, MOVE } from "../actions/fila";


export default (state = [], action) => {

    switch (action.type) {

        case GET_FILA:
            return {...state, filaList: action.payload.data}
        case MOVE:
            return {...state, filaList: action.payload.data}

        default:
            return state;

    }

};
