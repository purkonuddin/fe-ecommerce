import axios from 'axios';
// import 'dotenv/config';
require('dotenv').config();
const react_app_url = 'http://localhost:8001/api/v1'; //process.env.REACT_APP_URL

export const getProducts = (data) => {
// secondary params
  // const product_name= data.product_name
  // const product_category= data.product_category
  // const seller= data.seller
  // const product_condition= data.product_condition 

  let secondary_params = data.product_name !== undefined ? `&product_name=${data.product_name}` : '';
  secondary_params = data.product_category !== undefined ? secondary_params + `&product_category=${data.product_category}` : secondary_params;
  secondary_params = data.seller !== undefined ? secondary_params + `&seller=${data.seller}` : secondary_params;
  secondary_params = data.product_condition !== undefined ? secondary_params + `&product_condition=${data.product_condition}` : secondary_params;
// params primary
  const order_by= data.order_by || 'added_at'
  const sort= data.sort || 'ASC'
  const limit= data.limit || 10
  const page= data.page || 1 

  console.log('@secondary_params : ', secondary_params);

    return {
      type: 'GETPRODUCTS',
      payload: axios({
        method: 'GET',
        url: `${react_app_url}/products?order_by=${order_by}&sort=${sort}&limit=${limit}&page=${page}${secondary_params}`,
      }),
    };
  };

  export const getProductById = (id) => {
    return {
      type: 'GET_APRODUCT',
      payload: axios({
        method: 'GET',
        url: `${react_app_url}/products/${id}`
      })
    }
  }
  
  export const postProduct = (data) => {
    return {
      type: 'POST_PRODUCT',
      payload: axios({
        method: 'POST',
        url: `${react_app_url}/products`,
        data: data,
      }),
    };
  };
  
  export const deleteProduct = (productId) => {
    return {
      type: 'DELETE_PRODUCT',
      payload: axios({
        method: 'DELETE',
        url: `${react_app_url}/products/${productId}`,
      }),
    };
  };
  
  export const updateProduct = (productId, data) => {
    return {
      type: 'UPDATE_PRODUCT',
      payload: axios({
        method: 'PATCH',
        url: `${react_app_url}/products/${productId}`,
        data: data,
      }),
    };
  };