import axios from 'axios';
require('dotenv').config();
const react_app_url = process.env.REACT_APP_URL; //'http://localhost:8001/api/v1';

export const getPropince = () => { 

    return {
      type: 'GET_PROPINCE',
      payload: axios({
        url: `${react_app_url}/ongkir/provinsi`,
      }), 
    };
};

export const getDestination = (propincy_id) => { 

    return {
      type: 'GET_DESTINATION',
      payload: axios({ 
        method: 'GET',
        url: `${react_app_url}/ongkir/kota/${propincy_id}`, 
      }), 
    };
};

export const postCost = (data) => { 
  // console.log('$$$Origin:...',data);
    return {
      type: 'POST_COST',
      payload: axios({ 
        method: 'POST',
        url: `${react_app_url}/ongkir/cost`, 
        data: data 
      }), 
      
    };
};
