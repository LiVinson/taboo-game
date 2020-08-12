
export const errorReducer = (state={}, action) => {
    if(!action.error) {
        return {
            ...state,
            error: null
        }
    }
    console.log("there was an error")
    console.log(action.type)
    console.log(action.payload)
    return {
        ...state,
        error: {
            type: action.type,
            errorMessage: action.payload
        }
    }
}