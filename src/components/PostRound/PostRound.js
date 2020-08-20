import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import { StyledPostRound, PlayedCardList, TabooRadio, TabooLabel, TabooWord, NoCardMessage } from './style'
import { LargeButton } from 'components/shared/Button'
import { changeCardStatus, updateRoundStatus } from 'store/actions/roundActions'

//Takes in taboo word, it's index, status, and a cb function that is called when user selects a different word in the list
//Returns a list item with a hidden radio button and label.
const TabooSelection = ({ word, index, status, onChange }) => {
	return (
		<TabooWord>
			<TabooRadio
				type="radio"
				name="tabooWord"
				value={index}
				id={word}
				onChange={(e) => {
					onChange(e.target.value, status)
				}}
			/>
			<TabooLabel htmlFor={word}>{word}</TabooLabel>
		</TabooWord>
	)
}

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
		const selections = Object.values(this.state)
		console.log(selections)
		return (
			//update - only watcher gets the buttonTabooCard buttons
			<StyledPostRound>
				{this.props.role === 'watcher' ? (
					<WatcherPostRound
						cardStatuses={['correct', 'skipped', 'discard']}
						cardsPlayed={this.props.cardsPlayed}
						handleCardSelection={this.handleCardSelection}
						updateSelectedCard={this.updateSelectedCard}
						selectedCards={selections}
					/>
				) : (
					<NonWatcherPostRound
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

const generateCardsPlayedButtonInfo = (statusArray, status, statusSelected, cb) => {
	console.log(statusSelected)
	const buttonInfo = statusArray
		.filter((cardType) => cardType !== status)
		.map((cardType) => {
			const button = { className: 'button' }
			button.text = cardType
			button.disabled = statusSelected.length > 0 ? false : true
			button.onClick = () => cb(status, cardType)
			return button
		})
	console.log(buttonInfo)
	return buttonInfo
}

const WatcherPostRound = ({ cardStatuses, cardsPlayed, handleCardSelection, selectedCards, updateSelectedCard }) => {
	//Loops over each card status, and returns a Taboo card with 2 buttons.
	//Filters cards played based on the status. Information needed to generate buttons,
	//select a card in the list, and change button status passed in
	// Then separates cards played in round based on current card status
	console.log(selectedCards)
	return (
		<React.Fragment>
			{cardStatuses.map((status, index) => (
				<CardsPlayed
					key={status}
					status={cardStatuses[index]}
					cardList={cardsPlayed.filter((card) => card.status === status)}
					handleChange={handleCardSelection}
					buttonInfo={generateCardsPlayedButtonInfo(
						cardStatuses,
						status,
						selectedCards[index],
						updateSelectedCard
					)}
				/>
			))}

			<LargeButton text="Confirm!" onClick={() => console.log('confirm!')} />
		</React.Fragment>
	)
}

//Returns a Taboo card with buttons to change card status to other two options or a card stating there are no cards in this status
const CardsPlayed = ({ status, cardList, handleChange, buttonInfo }) => {
	return (
		<ButtonTabooCard tabooWord={status} buttons={buttonInfo}>
			<PlayedCardList>
				{cardList.length > 0 ? (
					cardList.map((card) => (
						<TabooSelection
							key={card.index} //index in deck in firestore which is unchanging
							word={card.word}
							index={card.index}
							onChange={handleChange}
							status={status}
						/>
					))
				) : (
					<NoCardMessage>No {status} cards this round</NoCardMessage>
				)}
			</PlayedCardList>
		</ButtonTabooCard>
	)
}

const NonWatcherPostRound = ({ cardStatuses, cardsPlayed }) => {
	return <p>I'm a non watcher</p>
}
