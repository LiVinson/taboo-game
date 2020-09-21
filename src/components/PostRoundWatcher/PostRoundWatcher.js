import React from 'react'
import PropTypes from 'prop-types'
import InstructionsCard from 'components/InstructionsCard'
import CardsPlayed from 'components/CardsPlayed'
import { LargeButton } from 'components/shared/Button'
import Pending from 'components/shared/Pending'
import { ErrorMessage } from 'components/shared/FeedbackMessage'

//Used for each of 3 status types to create buttons to change card status to the other 2 statuses
export const generateCardsPlayedButtonInfo = (statusArray, status, statusSelected, cb, isPending) => {
	const buttonInfo = statusArray
		.filter((cardType) => cardType !== status)
		.map((cardType) => {
			const button = { className: 'button' }
			button.text = cardType
			button.disabled = statusSelected.length < 1 || isPending ? true : false
			button.onClick = () => cb(status, cardType)
			return button
		})

	return buttonInfo
}

const PostRoundWatcher = ({
	cardStatuses,
	cardsPlayed,
	handleCardSelection,
	selectedCards,
	updateSelectedCard,
	confirmRoundEnd,
	isPending,
	error,
}) => {
	//Loops over each card status, and returns a Taboo card with 2 buttons.
	//Filters cards played based on the status. Information needed to generate buttons,
	//select a card in the list, and change button status passed in
	// Then separates cards played in round based on current card status
	const instructions =
		"Review the cards from this round below. Select the word and click the button to change it's status. Select Confirm! when done to calculate scores."
	return (
		<React.Fragment>
			<InstructionsCard>{instructions}</InstructionsCard>
			{cardStatuses.map((status, index) => (
				<CardsPlayed
					// Only pass down error message if it is for this Card status. Indicated by error message include status type
					error={
						error.cards &&
						cardsPlayed.some(
							(card) => card.status === status && error.cards.includes(card.index.toString())
						)
							? error.cards
							: null
					}
					key={status}
					status={cardStatuses[index]}
					cardList={cardsPlayed.filter((card) => card.status === status)}
					handleChange={handleCardSelection}
					buttonInfo={generateCardsPlayedButtonInfo(
						cardStatuses,
						status,
						selectedCards[index],
						updateSelectedCard,
						isPending.cards //true when in progress of updating status
					)}
				/>
			))}
			<LargeButton text="Confirm!" disabled={isPending.round} onClick={confirmRoundEnd} />
			{isPending.round ? <Pending speed={300} message={'Updating scores'} /> : null}
			{error.round && <ErrorMessage error={error.round} />}
		</React.Fragment>
	)
}

PostRoundWatcher.propTypes = {
	cardStatuses: PropTypes.array.isRequired,
	cardsPlayed: PropTypes.array.isRequired,
	handleCardSelection: PropTypes.func.isRequired,
	selectedCards: PropTypes.array.isRequired,
	updateSelectedCard: PropTypes.func.isRequired,
	confirmRoundEnd: PropTypes.func.isRequired,
	isPending: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
}

export default PostRoundWatcher
