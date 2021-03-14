/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isFulfilled: false,
    isPending: false,
    isRejected: false,
    rejected: {},
    getProducts: {},
    getProductById:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
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
                ? action.payload.isAxiosError 
                    ? { status: action.payload.request.status, message: "Network to Api's Service is Error" } 
                    : { status: action.payload.request.status, message: action.payload.message }
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
        case 'GET_APRODUCT_PENDING':
            return {
                ...state,  
                getProductById: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_APRODUCT_REJECTED':
            return {
                ...state, 
                getProductById: {
                    isFulfilled: false,
                    isPending: false,
                    isRejected: true,
                    rejected: action.payload.response === undefined 
                    ? action.payload.isAxiosError 
                        ? { status: action.payload.request.status, message: "Network to Api's Service is Error" } 
                        : { status: action.payload.request.status, message: action.payload.message }
                    :{
                        status: action.payload.response.status,
                        message: action.payload.response.data.message
                    },
                    data:{},
                }
            }
        case 'GET_APRODUCT_FULFILLED':
            return {
                ...state,  
                getProductById: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        default:
            return state
    }
}