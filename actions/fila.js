/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_FILA = 'GET_FILA'
export const MOVE = 'MOVE'


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
        payload: axios.post(`/fila/move/${id}/${positions}`)
    }
}
