/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_DRIVERS = 'GET_DRIVERS'
export const SAVE_DRIVER = 'SAVE_DRIVER'


const axios = axiosInstance();

export const getDrivers = () => ({
      type: GET_DRIVERS,
      payload: axios.get(`/driver`)
})

export const saveDriver = driver => ({
      type: SAVE_DRIVER,
      payload: axios.post(`/driver`, driver)
})
