import {dbUpdateRoundStatus } from "utils/API"
import { errorActionCreator } from './errorActions'

const requestRoundStatus = () => {
    return {
        type: "REQUEST_ROUND_STATUS_UPDATE",
    }
}

const roundStatusSuccess = (status) => {
    return {
        type: "ROUND_STATUS_UPDATE_SUCCESS",
        payload: status
    }
}

export const updateRoundStatus = (gamecode, status) => {
    return (dispatch) => {
        dispatch(requestRoundStatus())
        console.log(gamecode)
        console.log(status)
        dbUpdateRoundStatus(gamecode, status).then(res => {
            dispatch(roundStatusSuccess(status))
        }).catch(error => {
            dispatch(errorActionCreator('ROUND_STATUS_UPDATE_FAILURE', error))
        })
        //Update status in firebase
        //Update as success or failure
    }
}