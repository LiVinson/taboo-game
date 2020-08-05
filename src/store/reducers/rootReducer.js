import { combineReducers } from "redux"
import { gameReducer } from "./gameReducer"
import { playersReducer } from "./playersReducer"

const rootReducer = combineReducers({
    game: gameReducer,
    players: playersReducer
})

export default rootReducer