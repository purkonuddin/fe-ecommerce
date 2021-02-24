/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isFulfilled: false,
    isPending: false,
    isRejected: false,
    rejected: {},
    getCategories: {},
  }
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'GETCATEGORIES_PENDING':
            return {
                ...state, 
                isFulfilled: false,
                isPending: true,
                isRejected: false,
                rejected: {},
                getCategories: {}
            }
        case 'GETCATEGORIES_REJECTED':
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
                 getCategories: {}
            }
        case 'GETCATEGORIES_FULFILLED':
            return {
                ...state, 
                isFulfilled: true,
                isPending: false,
                isRejected: false,
                rejected: {},
                getCategories: action.payload.data.result,
            }
        default:
            return state
    }
}