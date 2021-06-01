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
    },
    postProduct:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    searchProducts:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    sellersProducts: {
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
  }
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'SELLERS_PRODUCTS_PENDING':
            return {
                ...state,
                sellersProducts: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'SELLERS_PRODUCTS_REJECTED':
            return {
                ...state,
                sellersProducts: {
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
        case 'SELLERS_PRODUCTS_FULFILLED': 
            return {
                ...state,
                sellersProducts: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'SEARCH_PRODUCTS_PENDING':
            return {
                ...state,
                searchProducts: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'SEARCH_PRODUCTS_REJECTED':
            return {
                ...state,
                searchProducts: {
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
        case 'SEARCH_PRODUCTS_FULFILLED':
            return {
                ...state,
                searchProducts: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data:action.payload.data.result,
                }
            }
        case 'POST_PRODUCT_PENDING':
            return {
                ...state,  
                postProduct: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'POST_PRODUCT_REJECTED':
            return {
                ...state, 
                postProduct: {
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
        case 'POST_PRODUCT_FULFILLED':
            return {
                ...state, 
                postProduct:{
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
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