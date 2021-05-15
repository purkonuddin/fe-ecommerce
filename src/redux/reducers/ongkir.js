/* eslint-disable import/no-anonymous-default-export */
const initialState = { 
    propince:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    destination:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    },
    cost:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
  }
  
export default function (state = initialState, action) {
    switch (action.type) { 
        case 'GET_PROPINCE_PENDING':
            return {
                ...state,  
                propince: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_PROPINCE_REJECTED':
            return {
                ...state, 
                propince: {
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
        case 'GET_PROPINCE_FULFILLED':
            return {
                ...state,  
                propince: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data
                }
            }
        case 'GET_DESTINATION_PENDING':
            return {
                ...state,  
                destination: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'GET_DESTINATION_REJECTED':
            return {
                ...state, 
                destination: {
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
        case 'GET_DESTINATION_FULFILLED':
            return {
                ...state,  
                destination: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result
                }
            }
        case 'POST_COST_PENDING':
            return {
                ...state,  
                cost: {
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'POST_COST_REJECTED':
            return {
                ...state, 
                cost: {
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
        case 'POST_COST_FULFILLED':
            return {
                ...state,  
                cost: {
                    isFulfilled: true,
                    isPending: false,
                    isRejected: false,
                    rejected: {},
                    data: action.payload.data.result
                }
            }
        default:
            return state
    }
}