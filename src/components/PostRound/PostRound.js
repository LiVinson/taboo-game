import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostRoundNonWatcher from 'components/PostRoundNonWatcher'
import PostRoundWatcher from 'components/PostRoundWatcher'
import { FilteredTabooList } from 'components/shared/TabooCard'
import { StyledPostRound } from './style'
import {
	changeCardStatus,
	updateRoundStatus,
	updateRoundScore,
	completeRound,
} from 'store/actions/roundActions'
import { endGame } from 'store/actions/gameActions'

export class PostRound extends React.Component {
	constructor(props) {
		super(props)

		//stores the firestore deck property value of the selected card.
		this.state = {
			correctSelection: '',
			skippedSelection: '',
			discardSelection: '',
		}
	}

	//Called onchange of radio button value. Set in state so that on click to change the status, can determine which word is selected
	handleCardSelection = (cardIndex, status) => {
		const statuses = ['correct', 'skipped', 'discard']
		const notSelectedStatuses = statuses.filter((cardStatus) => cardStatus !== status)
		const property = status + 'Selection'
		//Set the card index value for the status currently selected and clear the 2 statuses not currently selected
		this.setState({
			[property]: cardIndex,
			[notSelectedStatuses[0] + 'Selection']: '',
			[notSelectedStatuses[1] + 'Selection']: '',
		})
	}

	//Called on click of the correct, skip, or discard buttons
	updateSelectedCard = (previousStatus, newStatus) => {
		const property = previousStatus + 'Selection'
		const indexToChange = this.state[property]
		console.log(`card changing: ${this.state[property]} to ${newStatus}`)
		//called prop method to trigger dispatch
		this.props.changeCardStatus(newStatus, indexToChange)
	}

	confirmRoundEnd = () => {
		console.log('ending the round')
		//add means to make 'Confirm' button disabled so it can't be clicked again
		this.props.updateRoundScore().then(() => {
			console.log('score was updated. Time to complete round')
			 this.props.completeRound()			
		})
	}

	render() {
		//Creates array of the selected cards for each status.
		const selections = Object.values(this.state)
		const cardStatuses = ['correct', 'skipped', 'discard']

		return (
			//update - only watcher gets the buttonTabooCard buttons
			<StyledPostRound>
				{this.props.role === 'watcher' ? (
					<PostRoundWatcher
						cardStatuses={cardStatuses}
						cardsPlayed={this.props.cardsPlayed}
						handleCardSelection={this.handleCardSelection}
						updateSelectedCard={this.updateSelectedCard}
						selectedCards={selections}
						confirmRoundEnd={this.confirmRoundEnd}
					/>
				) : (
					<PostRoundNonWatcher>
						{cardStatuses.map((status) => (
							<FilteredTabooList
								key={status}
								unfilteredList={this.props.cardsPlayed}
								filterKey="status"
								filterValue={status}
								displayProperty="word"
								listTitle={status}
								noneMessage={`No ${status} cards this round`}
							/>
						))}
					</PostRoundNonWatcher>
				)}
			</StyledPostRound>
		)
	}
}

PostRound.propTypes = {
	cardsPlayed: PropTypes.array.isRequired,
	updateRoundStatus: PropTypes.func.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	role: PropTypes.string.isRequired,
}

// const mapStateToProps = (state, ownProps) => {
// 	console.log(ownProps)
// 	const game = state.firestore.data?.games?.[ownProps.gamecode]
// 	let endGameMethod, endValue, half
// 	//Only need to pass additional props when the half has changed
// 	if (game && game.gameplay.half !== ownProps.half) {
// 		endGameMethod = game.endGameMethod
// 		endValue = game.endValue
// 		half = game.gameplay.half
// 	}

// 	return {
// 		endGameMethod,
// 		endValue,
// 		half,
// 	}
// }

const mapDispatchToProps = (dispatch, prevProps) => {
	const { gamecode } = prevProps
	return {
		updateRoundStatus: (newRoundStatus) => dispatch(updateRoundStatus(gamecode), newRoundStatus),
		changeCardStatus: (status, cardIndex) => dispatch(changeCardStatus(gamecode, status, cardIndex)),
		updateRoundScore: () => dispatch(updateRoundScore(gamecode)),
		completeRound: () => dispatch(completeRound(gamecode)),

	}
}

export default connect(null, mapDispatchToProps)(PostRound)
