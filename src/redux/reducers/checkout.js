/* eslint-disable import/no-anonymous-default-export */
const initialState = { 
    postCart:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    getCart:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    postOrder:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }, 
    patchCartToOrder: {
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
  }
  
export default function (state = initialState, action) {
    switch (action.type) { 
        case 'PATCH_CARTTOORDER_PENDING':
            return {
                ...state,
                patchCartToOrder: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'PATCH_CARTTOORDER_REJECTED':
            return {
                ...state,
                patchCartToOrder: {
                    isFulfilled: false,
                    isPending: false,
                    isRejected: true,
                    rejected: {},
                    data:{},
                }
            }
        case 'PATCH_CARTTOORDER_FULFILLED':
            return {
                ...state,
                patchCartToOrder: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'CHECKOUT_PENDING':
            return {
                ...state,
                postOrder:{
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'CHECKOUT_REJECTED':
            return {
                ...state,
                postOrder:{
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
        case 'CHECKOUT_FULFILLED':
            return {
                ...state,
                postOrder:{
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'GET_CART_PENDING':
            return {
                ...state,  
                getCart: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_CART_REJECTED':
            return {
                ...state, 
                getCart: {
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
        case 'GET_CART_FULFILLED':
            return {
                ...state,  
                getCart: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'POST_CART_PENDING':
            return {
                ...state,  
                postCart: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'POST_CART_REJECTED':
            return {
                ...state, 
                postCart: {
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
        case 'POST_CART_FULFILLED':
            return {
                ...state,  
                postCart: {
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