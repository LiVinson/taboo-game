import React from 'react'
import Rules from 'components/Rules'
import PlayerListCard from 'components/PlayerListCard'
import { Button } from 'components/shared/Button'
import { StyledGameInfo } from './style'

//Displays a link for Show Rules and Show Teams. On click, displays a TabooCard with Rules/Team and link changes to Hide Rules/Teams
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
		this.setState((state) => {
			return {
				[gameInfo]: !state[gameInfo],
			}
		})
	}

	render() {
		const buttonInfo = [
			{
				text: this.state.showRules ? 'Hide Rules' : 'Show Rules',
				type: 'button',
				onClick: this.toggleGameInfo,
				name: 'showRules',
				border: true,
			},
			{
				text: this.state.showTeams ? 'Hide Teams' : 'Show Teams',
				type: 'button',
				onClick: this.toggleGameInfo,
				name: 'showTeams',
				border: true,
			},
		]

		//dummy data - to be retrieved from firebase using gamecode
		const players = [
            { id: 12345, name: "Alexa", team: "team1" },
            { id: 12346, name: "Stephen", team: "team1" },
            { id: 12347, name: "Yumani", team: "team2" },
            { id: 12348, name: "Faith", team: "team1" },
            { id: 12349, name: "Lisa", team: "team2" },
            { id: 12340, name: "Danielle", team: "team2" },
          ]

		const { showRules, showTeams } = this.state

		return (
			<StyledGameInfo open={showRules || showTeams}>
				{<Button {...buttonInfo[0]} />}
				{<Button {...buttonInfo[1]} />}
				{showRules && <Rules toggleGameInfo={this.toggleGameInfo} />}
				{showTeams && <PlayerListCard players={players} currentPlayer="12349" />}
			</StyledGameInfo>
		)
	}
}

export default GameInfo
