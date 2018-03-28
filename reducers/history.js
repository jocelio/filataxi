import { GET_HISTORY } from './../actions/history'
import _ from "lodash"


export default (state = [], action) => {

    switch (action.type) {

        case GET_HISTORY:
            return {...state, historyList: _.orderBy(action.payload.data, h => h.id, "desc")}

        default:
            return state;

    }

};
