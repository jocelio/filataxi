/**
 * Created by jocelio on 05/03/18.
 */
import { axiosInstance } from "../factory/AxiosFactory";
import _ from 'lodash'
export const DO_LOGIN = 'DO_LOGIN'
export const USER_INFO ='USER_INFO';
export const LOGGED_DRIVER= 'LOGGED_DRIVER'
export const USER_ADMIN='USER_ADMIN'

const axios = axiosInstance();

export const login = ({username, password}) => {

    const client = {grant_type:"password",
                client_id:"EGxgfhCfV96GY69apjFBLLqj5bhR3i5K",
                client_secret:"i0RO0SHfUC8x73xaGquB_H-2L97arzLcOPVaY-H_q3WtXKHM7fHl3nWSHZUTAH-X",
                audience:"http://localhost:8080",
                scope:"profile id_token openid"}

    return {
        type: DO_LOGIN,
        payload: axios.post('https://jocelio.auth0.com/oauth/token', {...client, username, password})
    }
 }

 export const userInfo = token => (
        {type: USER_INFO,
        payload: axios.get('https://jocelio.auth0.com/userinfo', {
             headers: {
               Authorization: 'Bearer ' + token
             }
        })})

export const loggedDriver = email => (
    {type: LOGGED_DRIVER,
    payload: axios.get(`/driver/${email}`)}
)

export const isAdmin = token => {
  try{
      const tokenData = parseJwt(token)
      const roles = tokenData['https://filataxi.com/user_metadata'].roles
      const isAdmin = !_(roles).filter(f => f == "admin").isEmpty()
      return {type: USER_ADMIN, payload: isAdmin}
    }catch(ignired){
      return {type: USER_ADMIN, payload: false}
    }
}

const parseJwt = token => {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace('-', '+').replace('_', '/');
   return JSON.parse(atob(base64));
}
