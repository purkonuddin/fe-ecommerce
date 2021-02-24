/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isFulfilled: false,
    isPending: false,
    isRejected: false,
    rejected: {},
    getSlides: {},
  }
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'GETSLIDE_PENDING':
            return {
                ...state, 
                isFulfilled: false,
                isPending: true,
                isRejected: false,
                rejected: {},
                getSlides: {}
            }
        case 'GETSLIDE_REJECTED':
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
                 getSlides: {}
            }
        case 'GETSLIDE_FULFILLED':
            return {
                ...state, 
                isFulfilled: true,
                isPending: false,
                isRejected: false,
                rejected: {},
                getSlides: action.payload.data.result,
            }
        default:
            return state
    }
}