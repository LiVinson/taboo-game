import React from "react"
import "./CreateGame.scss"
import TabooCard from "components/TabooCard"


export default function CreateGame(props) {
  return (
        <TabooCard
          tabooWord="New Game"
          list={null}
          type="home"
           > 
            <form>
                <label>This is a label</label>
                <input/>
            </form>
        </TabooCard>
  )
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