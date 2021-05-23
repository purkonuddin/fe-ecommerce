/* eslint-disable import/no-anonymous-default-export */
const initialState = { 
    getUserAddress:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    postUserAddress:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    patchMyAccount: {
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    getMyStore: {
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_MYSTORE_PENDING':
            return {
                ...state,
                getMyStore: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_MYSTORE_REJECTED':
            return {
                ...state,
                getMyStore: {
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
        case 'GET_MYSTORE_FULFILLED':
            return {
                ...state,
                getMyStore: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'POST_MYSTORE_PENDING':
            return {
                ...state,
                createMyStore: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'POST_MYSTORE_REJECTED':
            return {
                ...state,
                createMyStore: {
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
        case 'POST_MYSTORE_FULFILLED':
            return {
                ...state,
                createMyStore: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'POST_ADDRESS_PENDING':
            return {
                ...state,
                postUserAddress: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'POST_ADDRESS_REJECTED':
            return {
                ...state,
                postUserAddress: {
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
        case 'POST_ADDRESS_FULFILLED':
            return {
                ...state,
                postUserAddress: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'PATCH_MYACCOUNT_PENDING':
            return {
                ...state,
                patchMyAccount: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'PATCH_MYACCOUNT_REJECTED':
            return {
                ...state,
                patchMyAccount: {
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
        case 'PATCH_MYACCOUNT_FULFILLED':
            return {
                ...state,  
                patchMyAccount: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result,
                }
            }
        case 'GET_USERADDRESS_PENDING':
            return {
                ...state,  
                getUserAddress: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_USERADDRESS_REJECTED':
            return {
                ...state, 
                getUserAddress: {
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
        case 'GET_USERADDRESS_FULFILLED':
            return {
                ...state,  
                getUserAddress: {
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