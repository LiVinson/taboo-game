import React from "react"
import Modal from "./Modal"

const style = {
  background: "red",
  padding: "10px 15px",
  display: "flex",
  justifyContent: "flex-end",
}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayInstructions: false,
    }

    this.toggleInstructions = this.toggleInstructions.bind(this)
  }

  toggleInstructions() {
    this.setState(({ displayInstructions }) => ({
      displayInstructions: !displayInstructions,
    }))
  }

  render() {
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
              <button onClick={() => this.toggleInstructions()}>
                How to Play
              </button>
            </li>
          </ul>
        </div>
        <Modal
          display={this.state.displayInstructions}
          toggleDisplay={this.toggleInstructions}
          header="Instructions"
        >
          Here are the instructions
        </Modal>
      </React.Fragment>
    )
  }
}
