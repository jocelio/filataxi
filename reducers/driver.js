import { GET_DRIVERS, SAVE_DRIVER, UPDATE_DRIVER } from "../actions/driver";


export default (state = [], action) => {

    switch (action.type) {

        case GET_DRIVERS:
            return {...state, driverList: action.payload.data}
        case SAVE_DRIVER:
            return {...state, driverList: [...state.driverList, action.payload.data]}
        case UPDATE_DRIVER:
            return {...state, driverList: [...state.driverList.filter(f => f.id != action.payload.data.id), action.payload.data]}

        default:
            return state;

    }

};
