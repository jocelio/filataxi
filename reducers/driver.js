import { GET_DRIVERS, SAVE_DRIVER } from "../actions/driver";


export default (state = [], action) => {

    switch (action.type) {

        case GET_DRIVERS:
            return {...state, driverList: action.payload.data}
        case SAVE_DRIVER:
            return {...state, driverList: [...state.driverList, action.payload.data]}

        default:
            return state;

    }

};
