/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_FILA = 'GET_FILA'
export const MOVE = 'MOVE'
export const MOVE_HEAD = 'MOVE_HEAD'
export const CHANGE_STATUS = 'CHANGE_STATUS'


const axios = axiosInstance();

export const getFila = () => {

    return {
        type: GET_FILA,
        payload: axios.get(`/fila`)
    }
}

export const move = ({id, positions}) => {
    return {
        type: MOVE,
        payload: axios.post(`/fila/move-up/${id}/${positions}`)
    }
}

export const changeStatus = id => {
    return {
        type: CHANGE_STATUS,
        payload: axios.put(`/fila/change-status/${id}`)
    }
}

export const moveHead = () => {
    return {
        type: MOVE_HEAD,
        payload: axios.post(`/fila/head`)
    }
}
