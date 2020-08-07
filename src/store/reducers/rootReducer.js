import { combineReducers } from "redux"
import { gameReducer } from "./gameReducer"
import { playersReducer } from "./playersReducer"
import { errorReducer } from "./errorReducer"

const rootReducer = combineReducers({
    game: gameReducer,
    players: playersReducer,
    error: errorReducer
})

export default rootReducer