import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = 'http://localhost:8001/api/v1'; //process.env.REACT_APP_URL

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