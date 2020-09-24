import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostRoundNonWatcher from 'components/PostRoundNonWatcher'
import PostRoundWatcher from 'components/PostRoundWatcher'
import { FilteredTabooList } from 'components/shared/TabooCard'
import { StyledPostRound } from './style'
import { completeRound } from 'store/actions/roundActions'
import { changeCardStatus } from 'store/actions/cardActions'

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

	componentDidUpdate(prevProps) {
		//If isPending.cards was true due to updating card, and now update is complete,
		//clear the selection state so buttons for that card will return to disabled
		if (prevProps.isPending.cards && !this.props.isPending.cards) {
			this.setState({
				correctSelection: '',
				skippedSelection: '',
				discardSelection: '',
			})
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
		//called prop method to trigger dispatch. Changes card status in firestore
		this.props.changeCardStatus(newStatus, indexToChange)
	}

	//Called when Watcher selects 'Confirm' button
	confirmRoundEnd = () => {
		//Updates score in firestore based on status of cards and game rules. Once done, updates round half and updates turn as needed.
		this.props.completeRound()
	}

	render() {
		//Creates array of the selected cards string for each status.
		const selections = [this.state.correctSelection, this.state.skippedSelection, this.state.discardSelection]
		const cardStatuses = ['correct', 'skipped', 'discard']

		return (
			//Watcher card includes buttons to updates card statuses and trigger next round
			<StyledPostRound>
				{this.props.role === 'watcher' ? (
					<PostRoundWatcher
						cardStatuses={cardStatuses}
						cardsPlayed={this.props.cardsPlayed}
						handleCardSelection={this.handleCardSelection}
						updateSelectedCard={this.updateSelectedCard}
						selectedCards={selections} // array of selected values
						confirmRoundEnd={this.confirmRoundEnd}
						isPending={this.props.isPending}
						error={this.props.error}
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
	gamecode: PropTypes.string.isRequired,
	cardsPlayed: PropTypes.array.isRequired,
	role: PropTypes.string.isRequired,
	isPending: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	completeRound: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		isPending: {
			round: state.round.pending,
			cards: state.cards.pending,
		},
		error: {
			round: state.round.error && state.round.error.errorMessage,
			cards: state.cards.error && state.cards.error.errorMessage,
		},
	}
}
const mapDispatchToProps = (dispatch, prevProps) => {
	const { gamecode, round, half } = prevProps
	return {
		changeCardStatus: (cardStatus, cardIndex) =>
			dispatch(changeCardStatus(gamecode, cardStatus, cardIndex, 'postround')),
		completeRound: () => dispatch(completeRound(gamecode, round, half)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostRound)
