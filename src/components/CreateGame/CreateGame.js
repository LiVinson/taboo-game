import React from "react"
import "./CreateGame.scss"
import TabooCard from "components/TabooCard"
import CreateGameForm from "components/CreateGameForm"

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      gameMode: "remote",
      endGameMethod: "turns",
      turnsValue: 2,
      timeValue:60,
      skipPenalty: "none",
    }
  }

  handleSubmit(values, setSubmitting) {

    alert(JSON.stringify(values, null, 2))
        //Finishes Formik submission process
        setSubmitting(false)
  }

  handleBackClick = () => {
    console.log(this)
    this.props.history.push("/home")
  }
  render() {
    const buttonInfo = [{text: "Back", className:"button", onClick:this.handleBackClick},{form:"createGameForm", text:"Submit", className:"button", type:"submit" }]
    return (
      <TabooCard tabooWord="New Game" type="home" buttons={buttonInfo}>
        <CreateGameForm
          initialValues={this.state}
          handleSubmit={this.handleSubmit}
          
        />
      </TabooCard>
    )
  }
}

/*
Change to class component that renders Form.
Form UI:
- Input with Label (1)
- Set of Radio Buttons with Label (2)
- Set of Radio Button Drop Down combos ()


- Handle Name Input and Validation - state and Handler --> Form
- Store selected Game Mode value - state --> Form
- Check End Game Selection value and store - state --> Form
- Store SKipping Penalty Value - state --> Form
- Form able to be submitted - state --> Taboo --> ButtonGroups
*/
