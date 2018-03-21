import { GET_DRIVERS } from "../actions/driver";


export default (state = [], action) => {

    switch (action.type) {

        case GET_DRIVERS:
            return {...state, driverList: action.payload.data}
        default:
            return state;

    }

};
