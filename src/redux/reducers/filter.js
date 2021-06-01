/* eslint-disable import/no-anonymous-default-export */
const initialState = { 
    colors: {},
    sizes: {},
    brands: {},
    categories: {},
    filterIsApply: false,
    filterIsDiscard: true
  }
  
export default function (state = initialState, action) { 
    switch (action.type) { 
        case 'FILTER_APPLY': 
            return {
                ...state,  
                colors: action.payload.colors,
                sizes: action.payload.sizes,
                brands: action.payload.selections,
                categories: action.payload.categories,
                filterIsApply: true,
                filterIsDiscard: false
            }

        case 'FILTER_DISCARD':
        return {
            ...state,  
            colors: {},
            sizes: {},
            brands: {},
            categories: {},
            filterIsApply: false,
            filterIsDiscard: true
        }
        default:
            return state
    }
}