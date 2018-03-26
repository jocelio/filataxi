import { GET_HISTORY } from './../actions/history'


export default (state = [], action) => {

    switch (action.type) {

        case GET_HISTORY:
            return {...state, historyList: action.payload.data}

        default:
            return state;

    }

};
