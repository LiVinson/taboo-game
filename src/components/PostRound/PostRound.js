import React from 'react'
import PropTypes from "prop-types"
import { ButtonTabooCard } from 'components/shared/TabooCard'
import { StyledPostRound, PlayedCardList, TabooRadio, TabooLabel, TabooWord, NoCardMessage } from './style'
import { LargeButton } from 'components/shared/Button'

//Takes in taboo word, it's status and a cb function that is called when user selects a different word in the lit
const TabooSelection = ({ word, status, onChange }) => {
	return (
		<TabooWord>
			<TabooRadio
				type="radio"
				name="tabooWord"
				value={word}
				id={word}
				onChange={(e) => onChange(e.target.value, status)}
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

		this.state = {
			correctSelection: '',
			skipSelection: '',
			discardSelection: '',
		}
	}

	//Called onchance of radio button value. Set in state so that on click to change the status, can determine which word is selected
	handleCardSelection = (card, status) => {
		console.log(card, status)
		const property = status + 'Selection'
		this.setState({
			[property]: card,
		})
	}

	//Called on click of the correct, skip, or discard buttons
	changeCardStatus = (oldStatus, newStatus) => {
		const property = oldStatus + 'Selection'
		console.log('changing card from ', oldStatus)
		console.log('changing card to ', newStatus)
		console.log(`card changing: ${this.state[property]}`)
	}
	render() {
		//Additional properties added based on which card button is appearing in.
		const correctButton = { text: 'Correct', className: 'button' }
		const skipButton = { text: 'Skip', className: 'button' }
		const discardButton = { text: 'Discard', className: 'button' }

		//Used to disable correct, skip, discard buttons if no taboo word is selected to update the status
		const correctSelected = this.state.correctSelection.length < 1
		const skipSelected = this.state.skipSelection.length < 1
		const discardSelected = this.state.discardSelection.length < 1

		//Separates cards played in round based on card status
		const correct = this.props.cardsPlayed.filter((card) => card.status === 'correct')
		const skip = this.props.cardsPlayed.filter((card) => card.status === 'skip')
		const discard = this.props.cardsPlayed.filter((card) => card.status === 'discard')

		return (
			<StyledPostRound>
				{/* Additional props passed to buttons: if button should be disabled, and onClick containing current card status based on Taboo container it appears in, and new card status based on which button it is*/}
				<ButtonTabooCard
					tabooWord="Correct!"
					buttons={[
						{
							...skipButton,
							disabled: correctSelected,
							onClick: () => {
								this.changeCardStatus('correct', 'skip')
							},
						},
						{
							...discardButton,
							onClick: () => {
								this.changeCardStatus('correct', 'discard')
							},
							disabled: correctSelected,
						},
					]}
				>
					<PlayedCardList>
						{correct.length ? (
							correct.map((card, index) => (
								// Taboo selection returns a list item with the word as a label and a hidden radio button. Selecting the label selects the radio button, and calls the onChange call back function to keep track of which word is selected and the list it belongs to
								<TabooSelection
									key={index}
									word={card.word}
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
								this.changeCardStatus('skip', 'correct')
							},
						},
						{
							...discardButton,
							disabled: skipSelected,
							onClick: () => {
								this.changeCardStatus('skip', 'discard')
							},
						},
					]}
				>
					<PlayedCardList>
						{skip.length ? (
							skip.map((card, index) => (
								<TabooSelection
									key={index}
									word={card.word}
									onChange={this.handleCardSelection}
									status="skip"
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
								this.changeCardStatus('discard', 'correct')
							},
						},
						{
							...skipButton,
							disabled: discardSelected,
							onClick: () => {
								this.changeCardStatus('discard', 'skip')
							},
						},
					]}
				>
					<PlayedCardList>
						{discard.length ? (
							discard.map((card, index) => (
								<TabooSelection
									key={index}
									word={card.word}
									onChange={this.handleCardSelection}
									status="discard"
								/>
							))
						) : (
							<NoCardMessage>No cards discarded this round</NoCardMessage>
						)}
					</PlayedCardList>
				</ButtonTabooCard>
				{this.props.isWatcher ? <LargeButton text="Confirm!" onClick={this.props.confirmRoundEnd} /> : null}
			</StyledPostRound>
		)
	}
}

PostRound.propTypes = {
	cardsPlayed: PropTypes.array.isRequired,
	confirmRoundEnd: PropTypes.func.isRequired,
	isWatcher: PropTypes.bool.isRequired

}

export default PostRound
