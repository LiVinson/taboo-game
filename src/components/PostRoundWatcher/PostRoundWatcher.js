import React from "react"
import PropTypes from "prop-types"
import CardsPlayed from "components/CardsPlayed"
import { LargeButton } from 'components/shared/Button'

const generateCardsPlayedButtonInfo = (statusArray, status, statusSelected, cb) => {
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


const PostRoundWatcher = ({ cardStatuses, cardsPlayed, handleCardSelection, selectedCards, updateSelectedCard, confirmRoundEnd }) => {
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
			<LargeButton text="Confirm!" onClick={confirmRoundEnd} />
		</React.Fragment>
	)
}

PostRoundWatcher.propTypes = {
	cardStatuses: PropTypes.array.isRequired,
	cardsPlayed: PropTypes.array.isRequired,
	handleCardSelection: PropTypes.func.isRequired,
	selectedCards: PropTypes.array.isRequired,
	updateSelectedCard: PropTypes.func.isRequired
}

export default PostRoundWatcher