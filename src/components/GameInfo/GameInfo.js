import React from 'react'
import Rules from 'components/Rules'
import PlayerListCard from 'components/PlayerListCard'
import { TextButton, Button, PrimaryButton } from 'components/shared/Button'
import { StyledGameInfo } from './style'

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
				border:true
			},
			{
				text: this.state.showTeams ? 'Hide Teams' : 'Show Teams',
				type: 'button',
				onClick: this.toggleGameInfo,
				name: 'showTeams',
				border:true
			},
		]

		//dummy data - to be retrieved from firebase using gamecode
		const players = [
			{ name: 'Alexa', team: 'team1' },
			{ name: 'Stephen', team: 'team1' },
			{ name: 'Yumani', team: 'team2' },
			{ name: 'Faith', team: 'team1' },
			{ name: 'Lisa', team: 'team2' },
			{ name: 'Danielle', team: 'team2' },
		]

		const { showRules, showTeams } = this.state

		return (
			<StyledGameInfo open={showRules || showTeams}>
				{<Button {...buttonInfo[0]} />}
				{<Button {...buttonInfo[1]} />}
				{showRules && <Rules toggleGameInfo={this.toggleGameInfo} />}
				{showTeams && <PlayerListCard players={players} currentPlayer="TBD" />}
			</StyledGameInfo>
		)
	}
}

export default GameInfo
