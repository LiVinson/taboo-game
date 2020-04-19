import React from "react"
import Modal from "../components/Modal"
import { Link } from "react-router-dom"
import JoinForm from "../components/JoinForm"

// function joinMessage(state, action){
//     if (action.type === "success") {

//     } else if ()
// }
export default function Home() {
  const [displayState, setDisplayState] = React.useState(false)
  const toggleInstructions = () => {
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
        buttonText=""
      >
        {<JoinForm confirmGame={(code) => {}} />}
      </Modal>
    </div>
  )
}
