import React from "react"
import TabooCard from "components/TabooCard"
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
      <TabooCard tabooWord="Join Game" type="home" buttons={buttonInfo}>
        <JoinGameForm 
          initialValues={{name, gamecode}}
          handleSubmit={this.handleSubmit} />
      </TabooCard>
    )
  }
}

export default JoinGame
