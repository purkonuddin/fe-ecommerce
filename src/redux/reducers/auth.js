/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isAuthenticated: false,
    isFulfilled: false,
    isPending: false,
    isRegistered: false,
    isRejected: false,
    isResetPassword: false,
    isSentResetPassword: false,
    profile: {},
    rejected: {},
    resetPassword: {},
    sendReset: {},
    signup: {}
  }
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'SEND_PENDING':
            return {
                ...state, 
                isFulfilled: false,
                isPending: true,
                isRegistered: false,
                isRejected: false,
                isResetPassword: false,
                isSentResetPassword: false,
                profile: {},
                rejected: {},
                resetPassword: {},
                sendReset: {},
                signup: {}
            }
        case 'SEND_REJECTED':
            return {
                ...state,
                isFulfilled: false,
                isPending: false,
                isRegistered: false,
                isRejected: true,
                isResetPassword: false,
                isSentResetPassword: false,
                profile: {},
                rejected: action.payload.response === undefined 
                ? {} 
                : {
                    status: action.payload.response.status,
                    message: action.payload.response.data.message
                 },
                resetPassword: {},
                sendReset: {},
                signup: {}
            }
        case 'SEND_FULFILLED':
            return {
                ...state, 
                isFulfilled: true,
                isPending: false,
                isRegistered: false,
                isRejected: false,
                isResetPassword: false,
                isSentResetPassword: true,
                profile: {},
                rejected: {},
                resetPassword: {},
                sendReset: action.payload.data.result,
                signup: {}
            }
        case 'RESET_PENDING':
            return {
                ...state, 
                isFulfilled: false,
                isPending: true,
                isRegistered: false,
                isRejected: false,
                isResetPassword: false,
                isSentResetPassword: false,
                profile: {},
                rejected: {},
                resetPassword: {},
                sendReset: {},
                signup: {}
            }
        case 'RESET_REJECTED':
            return {
                ...state, 
                isFulfilled: false,
                isPending: false,
                isRegistered: false,
                isRejected: true,
                isResetPassword: false,
                isSentResetPassword: false,
                profile: {},
                rejected: action.payload.response === undefined 
                ? {} 
                : {
                    status: action.payload.response.status,
                    message: action.payload.response.data.message
                },
                resetPassword: {},
                sendReset: {},
                signup: {}
            }
        case 'RESET_FULFILLED':
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                isRegistered: false,
                isRejected: false,
                isResetPassword: true,
                isSentResetPassword: false,
                profile: {},
                rejected: {},
                resetPassword: action.payload.data.result,
                sendReset: {},
                signup: {}
            }
        case 'REGISTER_PENDING':
        return {
            ...state,
            isFulfilled: false,
            isPending: true,
            isRegistered: false,
            isRejected: false,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: {},
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        case 'REGISTER_REJECTED':
        return {
            ...state,
            isFulfilled: false,
            isPending: false,
            isRegistered: false,
            isRejected: true,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: action.payload.response === undefined 
            ? {} 
            : {
                status: action.payload.response.status,
                message: action.payload.response.data.message
            },
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        case 'REGISTER_FULFILLED':
        return {
            ...state,
            isFulfilled: true,
            isPending: false,
            isRegistered: true,
            isRejected: false,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: {},
            resetPassword:{},
            sendReset: {},
            signup: action.payload.data.result, 
        }
        case 'LOGIN_PENDING':
        return {
            ...state,
            isAuthenticated: false,
            isFulfilled: false,
            isPending: true,
            isRegistered: false,
            isRejected: false,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: {},
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        case 'LOGIN_REJECTED':
        return {
            ...state, 
            isAuthenticated: false,
            isFulfilled: false,
            isPending: false,
            isRegistered: false,
            isRejected: true,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: action.payload.response === undefined 
            ? {} 
            : {
                status: action.payload.response.status,
                message: action.payload.response.data.message
             },
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        case 'LOGIN_FULFILLED':
        return {
            ...state, 
            isAuthenticated: true,
            isFulfilled: true,
            isPending: false,
            isRegistered: false,
            isRejected: false,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: action.payload.data.result,
            rejected: {},
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        case 'LOGOUT':
        return {
            ...state,
            isAuthenticated: false,
            isFulfilled: false,
            isPending: false,
            isRegistered: false,
            isRejected: false,
            isResetPassword: false,
            isSentResetPassword: false,
            profile: {},
            rejected: {},
            resetPassword: {},
            sendReset: {},
            signup: {}
        }
        default:
        return state
    }
}
  