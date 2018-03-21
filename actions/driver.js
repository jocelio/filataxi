/**
 * Created by jocelio on 12/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";

export const GET_DRIVERS = 'GET_DRIVERS'

const axios = axiosInstance();

export const getDrivers = () => ({
      type: GET_DRIVERS,
      payload: axios.get(`/driver`)
})
