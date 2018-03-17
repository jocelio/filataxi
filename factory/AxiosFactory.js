import axios from 'axios';
import * as CONFIG from '../constants.json'
import {AsyncStorage} from "react-native";

export function axiosInstance(){

    const instance = axios.create({
        baseURL: CONFIG.urls.api,
        timeout: 5000,
    });

    AsyncStorage.getItem('access_token').then(token => {

        instance.interceptors.request.use(function (config) {
            if(token){
                config.headers = { Authorization: `Bearer ${token}`};
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

    })

    return instance;
}