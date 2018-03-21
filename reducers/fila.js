import { GET_FILA, MOVE, CHANGE_STATUS, MOVE_HEAD } from "../actions/fila";


export default (state = [], action) => {

    switch (action.type) {

        case GET_FILA:
            return {...state, filaList: action.payload.data}
        case MOVE:
            return {...state, filaList: action.payload.data}
        case CHANGE_STATUS:
            return {...state, positionChanged: action.payload.data}
        case MOVE_HEAD:
            return {...state, filaList: action.payload.data}



        default:
            return state;

    }

};
