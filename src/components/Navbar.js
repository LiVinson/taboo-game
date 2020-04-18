import React from "react"
import Modal from "./Modal"

const style = {
  background: "red",
  padding: "10px 15px",
  display: "flex",
  justifyContent: "flex-end",
}
export default function Navbar() {
  const [displayState, setDisplayState] = React.useState(false)
  const toggleInstructions = () => {
    console.log("instructions")
    setDisplayState((display) => !display)
  }
  return (
    <React.Fragment>
      <div style={style}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
          }}
        >
          <li>
            <button onClick={() => toggleInstructions()}>How to Play</button>
          </li>
        </ul>
      </div>
      <Modal
        display={displayState}
        toggleInstructions={toggleInstructions}
        header="Instructions"
      >
        Here are the instructions
      </Modal>
    </React.Fragment>
  )
}
