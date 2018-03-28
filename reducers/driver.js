import { GET_DRIVERS, SAVE_DRIVER, UPDATE_DRIVER, REMOVE_DRIVER, TOGGLE_DRIVER, EXIT_QUEUE } from "../actions/driver";
import _ from 'lodash'


export default (state = [], action) => {

    switch (action.type) {

        case GET_DRIVERS:
            return {...state, driverList: _.sortBy(action.payload.data, u => u.name )}
        case SAVE_DRIVER:
            return {...state, driverList: _.sortBy([...state.driverList, action.payload.data], u => u.name)}
        case UPDATE_DRIVER:
            return {...state, driverList: _.sortBy([...state.driverList.filter(f => f.id != action.payload.data.id), action.payload.data], u => u.name)}
        case REMOVE_DRIVER:
            return {...state, driverList: state.driverList.filter(f => f.id != action.driver_id)}
        case TOGGLE_DRIVER:
            return {...state, driverList: _.sortBy([...state.driverList.filter(f => f.id != action.payload.data.id), action.payload.data], u => u.name)}
        case EXIT_QUEUE:
            return {...state, driverList: _.sortBy([...state.driverList.filter(f => f.id != action.payload.data.id), action.payload.data], u => u.name)}


        default:
            return state;

    }

};
