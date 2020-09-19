import React from 'react'
import PropTypes from "prop-types"
import Rules from 'components/Rules'
import PlayerListCard from 'components/PlayerListCard'
import { FilteredTabooList } from 'components/shared/TabooCard'
import { Button } from 'components/shared/Button'
import { StyledGameInfo } from './style'

//Displays a link for Show Rules and Show Teams. On click, displays a TabooCard with Rules/Team 
//and link changes to Hide Rules/Teams
class GameInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showRules: false,
			showTeams: false,
		}
	}
	//Ttriggered on click of Show Rules or Show Teams button. Updates state property based on which button clicked
	toggleGameInfo = (event) => {
		const gameInfo = event.target.name
		this.setState((state) => {
			return {
				[gameInfo]: !state[gameInfo],
			}
		})
	}

	render() {
		const teams = ['team 1', 'team 2']

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

		const { showRules, showTeams } = this.state

		return (
			//Displays 2 buttons and 2 Taboo cards containing Rules and list team list when showing or nothing when hidden
			<StyledGameInfo open={showRules || showTeams}>
				{<Button {...buttonInfo[0]} />}
				{<Button {...buttonInfo[1]} />}
				{showRules && <Rules toggleGameInfo={this.toggleGameInfo} />}
				{showTeams && (
					<PlayerListCard>
						{teams.map((team) => (
							<FilteredTabooList
								key={team}
								unfilteredList={this.props.players}
								filterKey="team"
								filterValue={team}
								displayProperty="name"
								listTitle={team}
								specialKey="playerId"
								specialValue={this.props.currentPlayer.playerId}
							/>
						))}
					</PlayerListCard>
				)}
			</StyledGameInfo>
		)
	}
}

GameInfo.propTypes = {
	players: PropTypes.array.isRequired,
	currentPlayer: PropTypes.object.isRequired
}

export default GameInfo
