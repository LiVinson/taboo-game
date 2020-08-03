import React from "react"
import PropTypes from "prop-types"
import {ButtonTabooCard} from "components/shared/TabooCard"
import JoinGameForm from "components/JoinGameForm"

class JoinGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name:"",
      gamecode:""
    }
  }
  //Update to creating player id, validating gamecode, redirecting to 'Waiting Room'
  handleSubmit = (values, setSubmitting) => {
    alert(JSON.stringify(values, null, 2))
    //Finishes Formik submission process
    setSubmitting(false)
  }

  handleBackClick = () => {
    this.props.history.push("/home")
  }

  render() {
    const { name, gamecode } = this.state
    const buttonInfo = [
      { text: "Back", onClick: this.handleBackClick},
      {
        form: "joinGameForm",
        text: "Join",
        type: "submit",
      },
    ]
    return (
      <ButtonTabooCard tabooWord="Join Game" type="home" buttons={buttonInfo}>
        <JoinGameForm 
          initialValues={{name, gamecode}}
          handleSubmit={this.handleSubmit} />
      </ButtonTabooCard>
    )
  }
}

JoinGame.propTypes = {
  history: PropTypes.object.isRequired
}
export default JoinGame
