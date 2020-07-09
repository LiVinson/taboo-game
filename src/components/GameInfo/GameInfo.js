import React from "react"
import { TextButton } from "components/shared/Button"
import { StyledGameInfo } from "./style"
class GameInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRules: false,
      showTeams: false,
    }
  }
    toggleGameInfo = (event) => {
        const gameInfo = event.target.name
        console.log("toggle ", gameInfo)
        this.setState((state) => {
            return {
                [gameInfo]: !state[gameInfo]
            }
        })
    } 
  

  render() {
      const buttonInfo=[
          {text:"View Rules", type:"button", onClick: this.toggleGameInfo, name:"showRules"},
          {text:"View Teams", type:"button", onClick: this.toggleGameInfo, name:"showTeams"}]

    return (
        <StyledGameInfo>
            <TextButton {...buttonInfo[0]}/>
            <TextButton {...buttonInfo[1]}/>
        </StyledGameInfo>)
  }
}

export default GameInfo