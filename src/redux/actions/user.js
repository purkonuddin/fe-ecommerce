import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = process.env.REACT_APP_URL; //'http://localhost:8001/api/v1';

export const getUserAddress = (config) => {  
    return {
      type: 'GET_USERADDRESS',
      payload: axios({
        method: 'GET',
        url: `${react_app_url}/user/customer-address`,
        headers: {
            Authorization: config,
          }, 
      }),
    };
  };

export const updateMyAccount = (formData, config) => {
  return {
    type: 'PATCH_MYACCOUNT',
    payload: axios({
      method: 'patch',
      url: `${react_app_url}/user/edit-profile`,
      headers: {
        Authorization: config
      },
      data: formData
    })
  }
}
