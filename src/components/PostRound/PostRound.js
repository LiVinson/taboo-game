import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import { StyledPostRound, PlayedCardList, TabooRadio, TabooLabel, TabooWord, NoCardMessage } from './style'
import { LargeButton } from 'components/shared/Button'
import { changeCardStatus, updateRoundStatus } from 'store/actions/roundActions'

//Takes in taboo word, it's status and a cb function that is called when user selects a different word in the lit
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
/*
    ✔ For each card that was played, sort it into correct, skip, discard based on status
    ✔  For each status, return a Taboo card with status title
    ✔ In taboo body, loop over cards and display card.word as a radio button and label with radio hidden
    ✔ On selection of a radio button, style the label
    ✔ On click button, call function to > change the status(log for now)
    Word displays on new card list.
    On submit, call function to check if game is over
*/

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
		
		const property = status + 'Selection'
		this.setState({
			[property]: cardIndex,
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
		//Additional properties added based on which card button is appearing in.
		const correctButton = { text: 'Correct', className: 'button' }
		const skipButton = { text: 'Skip', className: 'button' }
		const discardButton = { text: 'Discard', className: 'button' }

		//Used to disable correct, skip, discard buttons if no taboo word is selected to update the status
		const correctSelected = this.state.correctSelection.length < 1
		const skipSelected = this.state.skippedSelection.length < 1
		const discardSelected = this.state.discardSelection.length < 1

		//Adds the index which matches the property name in firestore deck map.
		// Then separates cards played in round based on card status
		const correct = this.props.cardsPlayed
			.map((card, index) => ({ ...card, index }))
			.filter((card) => card.status === 'correct')
		const skip = this.props.cardsPlayed
			.map((card, index) => ({ ...card, index }))
			.filter((card) => card.status === 'skipped')
		const discard = this.props.cardsPlayed
			.map((card, index) => ({ ...card, index }))
			.filter((card) => card.status === 'discard')

		return (
			//update - only watcher gets the buttonTabooCard buttons
			<StyledPostRound>
				{/* Additional props passed to buttons: if button should be disabled, and onClick containing current card status based on Taboo container it appears in, and new card status based on which button it is*/}
				<ButtonTabooCard
					tabooWord="Correct!"
					buttons={[
						{
							...skipButton,
							disabled: correctSelected,
							onClick: () => {
								this.updateSelectedCard('correct', 'skipped')
							},
						},
						{
							...discardButton,
							onClick: () => {
								this.updateSelectedCard('correct', 'discard')
							},
							disabled: correctSelected,
						},
					]}
				>
					<PlayedCardList>
						{correct.length ? (
							correct.map((card) => (
								// Taboo selection returns a list item with the word as a label and a hidden radio button. Selecting the label selects the radio button, and calls the onChange call back function to keep track of which word is selected and the list it belongs to
								<TabooSelection
									key={card.index} //index in deck in firestore which is unchanging
									word={card.word}
									index={card.index}
									onChange={this.handleCardSelection}
									status="correct"
								/>
							))
						) : (
							<NoCardMessage>No cards correct this round</NoCardMessage>
						)}
					</PlayedCardList>
				</ButtonTabooCard>

				<ButtonTabooCard
					tabooWord="Skip!"
					buttons={[
						{
							...correctButton,
							disabled: skipSelected,
							onClick: () => {
								this.updateSelectedCard('skipped', 'correct')
							},
						},
						{
							...discardButton,
							disabled: skipSelected,
							onClick: () => {
								this.updateSelectedCard('skipped', 'discard')
							},
						},
					]}
				>
					<PlayedCardList>
						{skip.length ? (
							skip.map((card, index) => (
								<TabooSelection
									key={card.index} //index in deck in firestore which is unchanging
									word={card.word}
									index={card.index}
									onChange={this.handleCardSelection}
									status="skipped"
								/>
							))
						) : (
							<NoCardMessage>No cards skipped this round</NoCardMessage>
						)}
					</PlayedCardList>
				</ButtonTabooCard>

				<ButtonTabooCard
					tabooWord="Discard!"
					buttons={[
						{
							...correctButton,
							disabled: discardSelected,
							onClick: () => {
								this.updateSelectedCard('discard', 'correct')
							},
						},
						{
							...skipButton,
							disabled: discardSelected,
							onClick: () => {
								this.updateSelectedCard('discard', 'skipped')
							},
						},
					]}
				>
					<PlayedCardList>
						{discard.length ? (
							discard.map((card, index) => (
								<TabooSelection
									key={card.index} //index in deck in firestore which is unchanging
									word={card.word}
									index={card.index}
									onChange={this.handleCardSelection}
									status="discard"
								/>
							))
						) : (
							<NoCardMessage>No cards discarded this round</NoCardMessage>
						)}
					</PlayedCardList>
				</ButtonTabooCard>

				{this.props.role === 'watcher' && (
					<LargeButton text="Confirm!" onClick={this.props.updateRoundStatus} />
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
		changeCardStatus: (status, cardIndex) => dispatch(changeCardStatus(gamecode, status, cardIndex))
	}
}

export default connect(null, mapDispatchToProps)(PostRound)
