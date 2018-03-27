/**
 * Created by jocelio on 05/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";
export const GET_HISTORY = 'GET_HISTORY'

const axios = axiosInstance();


 export const getHistory = token => (
        {type: GET_HISTORY,
        payload: axios.get('/history')}
  )
