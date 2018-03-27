/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_FILA = 'GET_FILA'
export const MOVE = 'MOVE'
export const MOVE_HEAD = 'MOVE_HEAD'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const NEXT_QUEUE = 'NEXT_QUEUE'


const axios = axiosInstance();

export const getFila = () => ({
    type: GET_FILA,
    payload: axios.get(`/fila`)
})

export const move = ({id, positions}) => ({
    type: MOVE,
    payload: axios.post(`/fila/move-up/${id}/${positions}`)
})

export const changeStatus = id => ({
    type: CHANGE_STATUS,
    payload: axios.put(`/fila/change-status/${id}`)
})

export const moveHead = () => ({
    type: MOVE_HEAD,
    payload: axios.post(`/fila/head`)
})

export const nextQueue = days => ({
    type: NEXT_QUEUE,
    payload: axios.post(`/fila/next-queue/${days}`)
})
