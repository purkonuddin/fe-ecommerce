import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = process.env.REACT_APP_URL; //process.env.REACT_APP_URL

export const patchCartList = (data, config) => {
  return {
    type: 'PATCH_CARTTOORDER',
    payload: axios({
      method: 'PATCH',
      url: `${react_app_url}/order/changeStsItemAtChart`,
      headers: {
          Authorization: config,
        }, 
      data: data,
    }),
  };
}

export const postToCart = (data, config) => {  
  return {
    type: 'POST_CART',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/order/addToCart`,
      headers: {
          Authorization: config,
        }, 
      data: data,
    }),
  };
};

export const getCart = (config) => {  
  return {
    type: 'GET_CART',
    payload: axios({
      method: 'GET',
      url: `${react_app_url}/order`,
      headers: {
          Authorization: config,
        }
    }),
  };
};

export const checkout = (data, config) => {
  return {
    type: 'CHECKOUT',
    payload: axios({
      method: 'POST',
      url: `${react_app_url}/order/create-order`,
      headers: {
        Authorization: config,
      },
      data: data,
    }),
  };
}