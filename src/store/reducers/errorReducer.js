const initState = {
    error: {
        type: null,
        error: null
    }
}

export const errorReducer = (state=initState, action) => {
    if(!action.error) {
        return {
            ...state,
            error: {
                type: null,
                error: null
            }
        }
    }
    console.log("there was an error")
    console.log(action.type)
    console.log(action.error)
    return {
        ...state,
        error: {
            type: action.type,
            error: action.error
        }
    }
}