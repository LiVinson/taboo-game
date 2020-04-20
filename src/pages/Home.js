import React from "react"
import Modal from "../components/Modal"
import { Redirect } from "react-router-dom"
import JoinForm from "../components/JoinForm"
import { database } from "../utils/firebase_conn"
import { v4 as uuidv4 } from "uuid"

export default function Home() {
  const [displayState, setDisplayState] = React.useState(false) //controls instructions modal
  const [generateNewGame, setGenerateNewGame] = React.useState(false)
  const [redirectToNew, setRedirectToNew] = React.useState(null)
  const [gamecode, setGameCode] = React.useState(null)

  const toggleInstructions = () => {
    setDisplayState((display) => !display)
  }
  const style = {
    width: "400px",
    height: "200px",
    fontSize: "50px",
  }

  React.useEffect(() => {
    if (generateNewGame) {
      createNewGame()
    }
  }, [generateNewGame])

  const createNewGame = () => {
    const id = uuidv4()
    const gamecode = id.split("-")[0]
    console.log("gamecode: ", gamecode)

    const game = {
      status: "pending",
      unassigned: [],
      team1: {
        teamName: "Team 1",
        players: [],
        score: 0,
      },
      team2: {
        teamName: "Team 2",
        players: [],
        score: 0,
      },
    }
    database
      .ref(`games/${gamecode}`)
      .set(game)
      .then(() => {
        console.log(gamecode, "created")
        setRedirectToNew(true)
        setGameCode(gamecode)
        //Redirect to waiting room.
      })
      .catch((err) =>
        console.log(
          "There was an error creating a new game with gamecode: ",
          gamecode
        )
      )
  }

  if (redirectToNew && gamecode) {
    return <Redirect to={`/new?gamecode=${gamecode}`} />
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: "20px",
      }}
    >
      <button
        disabled={generateNewGame}
        onClick={() => setGenerateNewGame(true)}
        style={style}
      >
        Create New Game
      </button>

      <button
        onClick={() => {
          toggleInstructions()
        }}
        style={style}
      >
        Join Game
      </button>
      <Modal
        display={displayState}
        toggleInstructions={toggleInstructions}
        header="Join a Game of Taboo"
        buttonText=""
      >
        {<JoinForm confirmGame={(code) => {}} />}
      </Modal>
    </div>
  )
}
