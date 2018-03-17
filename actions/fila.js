/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_FILA = 'GET_FILA'


const axios = axiosInstance();

export const getFila = () => {

    return {
        type: GET_FILA,
        payload: axios.get(`/fila`)
    }
}
