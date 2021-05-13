import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = process.env.REACT_APP_URL; //'http://localhost:8001/api/v1';

export const login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/user/login`,
      data: data,
    }),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const postUser = (data) => {
  return {
    type: 'REGISTER',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/user/sign-up`,
      data: data,
    }),
  }
}

export const sendResetPassword = (data) => {
  return {
    type: 'SEND',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/user/send-reset-password`,
      data: data,
    }),
  }
}

export const resetPassword = (token, data) => {
  return {
    type: 'RESET',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/user/reset-password/${token}`,
      data: data,
    }),
  }
}

export const resetProfile = (data) => {
  return {
    type: 'SET_PROFILE',
    payload: {data:data}
  }
}
