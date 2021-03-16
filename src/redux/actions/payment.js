import axios from 'axios';
const react_app_url = process.env.REACT_APP_URL; //'http://localhost:8001/api/v1';

export const payment = (data, config) => { 
  return {
    type: 'PAYMENT',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/payment`,
      data: data,
      headers: {
        Authorization: config,
      }, 
    }), 
  };
};