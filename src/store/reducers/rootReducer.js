import { combineReducers } from "redux"
import { gameReducer } from "./gameReducer"

const rootReducer = combineReducers({
    game: gameReducer
})

export default rootReducer