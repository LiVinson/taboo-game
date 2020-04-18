import React from "react"
import Modal from "../components/Modal"
import { Link } from "react-router-dom"

export default function Home() {
  const [displayState, setDisplayState] = React.useState(false)
  const toggleInstructions = () => {
    console.log("instructions")
    setDisplayState((display) => !display)
  }
  const style = {
    width: "400px",
    height: "200px",
    fontSize: "50px",
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingTop: "20px",
      }}
    >
      <Link to="/new">
        <button style={style}>Create New Game</button>
      </Link>

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
      >
        <input type="text" placeholder="Gamecode" />
      </Modal>
    </div>
  )
}
