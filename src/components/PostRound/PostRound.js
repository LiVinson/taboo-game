import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostRoundNonWatcher from "components/PostRoundNonWatcher"
import PostRoundWatcher from "components/PostRoundWatcher"
import { StyledPostRound } from './style'
import { changeCardStatus, updateRoundStatus } from 'store/actions/roundActions'



class PostRound extends React.Component {
	constructor(props) {
		super(props)

		//stores the firestore deck property value of the selected card.
		this.state = {
			correctSelection: '',
			skippedSelection: '',
			discardSelection: '',
		}
	}

	//Called onchance of radio button value. Set in state so that on click to change the status, can determine which word is selected
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

	render() {
		//Creates array of the selected cards for each status.
		const selections = Object.values(this.state)

		return (
			//update - only watcher gets the buttonTabooCard buttons
			<StyledPostRound>
				{this.props.role === 'watcher' ? (
					<PostRoundWatcher
						cardStatuses={['correct', 'skipped', 'discard']}
						cardsPlayed={this.props.cardsPlayed}
						handleCardSelection={this.handleCardSelection}
						updateSelectedCard={this.updateSelectedCard}
						selectedCards={selections}
					/>
				) : (
					<PostRoundNonWatcher
						cardStatuses={['correct', 'skipped', 'discard']}
						cardsPlayed={this.props.cardsPlayed}
					/>
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

const mapDispatchToProps = (dispatch, prevProps) => {
	const { gamecode } = prevProps
	return {
		updateRoundStatus: () => dispatch(updateRoundStatus(gamecode)),
		changeCardStatus: (status, cardIndex) => dispatch(changeCardStatus(gamecode, status, cardIndex)),
	}
}

export default connect(null, mapDispatchToProps)(PostRound)






