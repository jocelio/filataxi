/**
 * Created by jocelio on 22/02/18.
 */

import { combineReducers } from 'redux';

import LoginReducer from './login'
import FilaReducer from './fila'
import DriverReducer from './driver'

import { DATA_AVAILABLE } from "../actions/"

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    console.log(action)
    switch (action.type) {
        case DATA_AVAILABLE:
            return {...state, data: action.data, loading:false }
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    state: (state = {}) => state,
    dataReducer: dataReducer,
    loginReducer: LoginReducer,
    filaReducer: FilaReducer,
    driverReducer: DriverReducer
})

export default rootReducer;
