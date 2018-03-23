/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_DRIVERS = 'GET_DRIVERS'
export const SAVE_DRIVER = 'SAVE_DRIVER'
export const INIT_DRIVER = 'INIT_DRIVER'
export const UPDATE_DRIVER = 'UPDATE_DRIVER'
export const ENQUEUE_DRIVER = 'ENQUEUE_DRIVER'


const axios = axiosInstance();

export const initDrivers = () => ({
      type: INIT_DRIVER,
      payload: axios.post(`/driver/init`)
})

export const enqueueDrivers = () => ({
      type: ENQUEUE_DRIVER,
      payload: axios.post(`/fila/enqueue`)
})

export const getDrivers = () => ({
      type: GET_DRIVERS,
      payload: axios.get(`/driver`)
})

export const saveDriver = driver => ({
      type: SAVE_DRIVER,
      payload: axios.post(`/driver`, driver)
})
export const updateDriver = driver => ({
      type: UPDATE_DRIVER,
      payload: axios.put(`/driver/${driver.id}`, driver)
})
