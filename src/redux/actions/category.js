import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = 'http://localhost:8001/api/v1';

export const getCategories = (data) => {
  return {
    type: 'GETCATEGORIES',
    payload: axios({
      method: 'GET',
      url: `${react_app_url}/category`,
      data: data,
    }),
  };
};