/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isFulfilled: false,
    isPending: false,
    isRejected: false,
    rejected: {},
    getProducts: {},
  }
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'GETPRODUCTS_PENDING':
            return {
                ...state, 
                isFulfilled: false,
                isPending: true,
                isRejected: false,
                rejected: {},
                getProducts: {}
            }
        case 'GETPRODUCTS_REJECTED':
            return {
                ...state,
                isFulfilled: false,
                isPending: false,
                isRejected: true,
                rejected: action.payload.response === undefined 
                ? {} 
                : {
                    status: action.payload.response.status,
                    message: action.payload.response.data.message
                 },
                 getProducts: {}
            }
        case 'GETPRODUCTS_FULFILLED':
            return {
                ...state, 
                isFulfilled: true,
                isPending: false,
                isRejected: false,
                rejected: {},
                getProducts: action.payload.data.result,
            }
        default:
            return state
    }
}