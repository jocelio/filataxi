import { DO_LOGIN, USER_INFO, LOGGED_DRIVER } from './../actions/login'

export default (state = [], action) => {

    switch (action.type) {

        case DO_LOGIN:
            return {...state, loginData: action.payload.data}
        case USER_INFO:
            return {...state, userInfo: action.payload.data}
        case LOGGED_DRIVER:
            return {...state, appDriver: action.payload.data}

        default:
            return state;

    }

};
