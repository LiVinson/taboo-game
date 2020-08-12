export const errorActionCreator = (errorType, error) => {
    console.log(errorType)
    return {
      type: errorType,
      error: true,
      payload: error,
    }
  }