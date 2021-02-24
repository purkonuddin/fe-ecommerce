import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = 'http://localhost:8001/api/v1';

export const getSlide = (data) => {
  return {
    type: 'GETSLIDE',
    payload: axios({
      method: 'GET',
      url: `${react_app_url}/slide`,
      data: data,
    }),
  };
};