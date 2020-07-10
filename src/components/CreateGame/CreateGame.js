import React from "react"
import { ButtonTabooCard } from "components/shared/TabooCard"
import CreateGameForm from "components/CreateGameForm"

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props)

    //Used for Form initial values
    this.state = {
      name: "",
      gameMode: "remote",
      endGameMethod: "turns",
      turnsValue: 2,
      timeValue: 60,
      skipPenalty: "none",
    }
  }

  //Update to creating player id, submitting to firebase, redirecting to 'Waiting Room'
  handleSubmit(values, setSubmitting) {
    alert(JSON.stringify(values, null, 2))
    //Finishes Formik submission process
    setSubmitting(false)
  }

  handleBackClick = () => {
     this.props.history.push("/home")
  }
  render() {
    const buttonInfo = [
      { text: "Back", className: "button", onClick: this.handleBackClick },
      {
        form: "createGameForm",
        text: "Submit",
        className: "button",
        type: "submit",
      },
    ]
    return (
      <ButtonTabooCard tabooWord="New Game" buttons={buttonInfo}>
        <CreateGameForm
          initialValues={this.state}
          handleSubmit={this.handleSubmit}
        />
      </ButtonTabooCard>
    )
  }
}
