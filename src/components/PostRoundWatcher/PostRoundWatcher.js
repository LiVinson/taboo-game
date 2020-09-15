import React from 'react'
import PropTypes from 'prop-types'
import CardsPlayed from 'components/CardsPlayed'
import { LargeButton } from 'components/shared/Button'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'

const generateCardsPlayedButtonInfo = (statusArray, status, statusSelected, cb, isPending) => {
	// console.log(status)
	// console.log(statusSelected)
	// console.log(statusSelected.length)
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

	return (
		<React.Fragment>
			{cardStatuses.map((status, index) => (
				<CardsPlayed
					// Only pass down error message if it is for this Card status
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
}

export default PostRoundWatcher
