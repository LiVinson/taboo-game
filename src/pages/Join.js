import React from "react"
import queryString from "query-string"
import { Link } from "react-router-dom"

function joinReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      gameData: action.data,
      loading: false,
      error: null,
    }
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: "There was an error validating game",
    }
  } else {
    throw new Error("something went wrong...")
  }
}

export default function Join({ location }) {
  //   console.log(queryString.parse(location.search))

  const query = queryString.parse(location.search)
  const gamecode = React.useRef(query.gamecode)
  console.log(gamecode)
  const [state, dispatch] = React.useReducer(joinReducer, {
    gameData: null,
    loading: true,
    error: null,
  })

  React.useEffect(() => {
    console.log("use effect")
    if (true) {
      //testing dipatcher
      dispatch({ type: "success", data: "here is the game data" })
    } else {
      dispatch({ type: "error" })
    }
  }, [gamecode])

  const { loading, error, gameData } = state

  if (loading) {
    return <p>Loading</p>
  } else if (error) {
    return <p>{error}</p>
  } else {
    return <WaitingRoom gameData={gameData} gamecode={gamecode.current} />
  }
}

function WaitingRoom({ gameData, gamecode }) {
  console.log(gamecode)
  return (
    <div>
      <p>{gameData}</p>{" "}
      <Link className="btn" to={`/play/gamecode=${gamecode}`}>
        Start Game!
      </Link>
    </div>
  )
}
