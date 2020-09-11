import React from 'react'
import PropTypes from 'prop-types'
import CardsPlayed from 'components/CardsPlayed'
import { LargeButton } from 'components/shared/Button'
import Pending from 'components/shared/Pending'

const generateCardsPlayedButtonInfo = (statusArray, status, statusSelected, cb) => {
	console.log(status)
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
	pendingMsg
}) => {
	console.log(isPending)
	//Loops over each card status, and returns a Taboo card with 2 buttons.
	//Filters cards played based on the status. Information needed to generate buttons,
	//select a card in the list, and change button status passed in
	// Then separates cards played in round based on current card status
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
			<LargeButton text="Confirm!" disabled={isPending} onClick={confirmRoundEnd} />
			{pendingMsg ? <Pending speed={300} message={pendingMsg} /> : null}
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
