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
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
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