
export const errorReducer = (state={}, action) => {
    if(!action.error) {
        return {
            ...state,
            error: null
        }
    }
    return {
        ...state,
        error: {
            type: action.type,
            errorMessage: action.payload
        }
    }
}