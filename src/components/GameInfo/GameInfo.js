import React from "react"
import Rules from "components/Rules"
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
      console.log(event)
        const gameInfo = event.target.name 
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
            {this.state.showRules ? <Rules toggleGameInfo={this.toggleGameInfo}/> : <TextButton {...buttonInfo[0]}/> }
            {this.state.showTeams ? "Show the Teams" : <TextButton {...buttonInfo[1]}/> }

            
        </StyledGameInfo>)
  }
}

export default GameInfo