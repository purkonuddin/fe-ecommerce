const initialState = { 
    midtransClient:{
        isFulfilled: false,
        isPending: false,
        isRejected: false,
        rejected: {},
        data:{},
    }
}

export default function (state = initialState, action) {
    switch (action.type) { 
        case 'PAYMENT_PENDING':
            return {
                ...state,
                midtransClient:{
                    isFulfilled: false,
                    isPending: true,
                    isRejected: false,
                    rejected: {},
                    data:{},
                }
            }
        case 'PAYMENT_REJECTED':
            return {
                ...state,
                midtransClient:{
                    isFulfilled: false,
                    isPending: false,
                    isRejected: true,
                    rejected: {},
                    data:{},
                }
            }
        case 'PAYMENT_FULFILLED':
            return {
                ...state,
                midtransClient: {
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