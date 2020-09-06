import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostRoundNonWatcher from 'components/PostRoundNonWatcher'
import PostRoundWatcher from 'components/PostRoundWatcher'
import { FilteredTabooList } from 'components/shared/TabooCard'
import { StyledPostRound } from './style'
import {
	changeCardStatus,
	updateRoundScore,
	completeRound,
} from 'store/actions/roundActions'

export class PostRound extends React.Component {
	constructor(props) {
		super(props)

		//stores the index of selected card: corresponds to the firestore deck object property of the card.
		this.state = {
			correctSelection: '',
			skippedSelection: '',
			discardSelection: '',
		}
	}

	//Called onchange of radio button value to select  card. Set in state so that on click to change the status, can determine which word is selected
	handleCardSelection = (cardIndex, status) => {
		const statuses = ['correct', 'skipped', 'discard']
		//array of the statuses that are not selected. Used to set them to empty string so only one word is selected at a time
		const notSelectedStatuses = statuses.filter((cardStatus) => cardStatus !== status)
		const property = status + 'Selection'
		//Set the card index value for the status currently selected and clear the 2 statuses not currently selected
		this.setState({
			[property]: cardIndex,
			[notSelectedStatuses[0] + 'Selection']: '',
			[notSelectedStatuses[1] + 'Selection']: '',
		})
	}

	//Called on click of the correct, skip, or discard buttons inside of taboocard. 
	updateSelectedCard = (previousStatus, newStatus) => {
		const property = previousStatus + 'Selection'
		const indexToChange = this.state[property]
		console.log(`card changing: ${this.state[property]} to ${newStatus}`)
		//called prop method to trigger dispatch. Changes card status in firestore
		this.props.changeCardStatus(newStatus, indexToChange)
	}

	//Called when Watcher selects 'Confirm' button
	confirmRoundEnd = () => {
		console.log('ending the round')
		//add means to make 'Confirm' button disabled so it can't be clicked again
		//Updates score in firestore based on status of cards and game rules. Once done, updates round half and updates turn as needed.
		this.props.updateRoundScore().then(() => {
			console.log('score was updated. Time to complete round')
			this.props.completeRound()			
		})
	}

	render() {
		//Creates array of the selected cards string for each status.
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
	role: PropTypes.string.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	completeRound: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch, prevProps) => {
	const { gamecode } = prevProps
	return {
		changeCardStatus: (status, cardIndex) => dispatch(changeCardStatus(gamecode, status, cardIndex)),
		updateRoundScore: () => dispatch(updateRoundScore(gamecode)),
		completeRound: () => dispatch(completeRound(gamecode)),
	}
}

export default connect(null, mapDispatchToProps)(PostRound)
