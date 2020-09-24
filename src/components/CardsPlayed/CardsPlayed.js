import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import RadioListItem from 'components/RadioListItem'
import List from 'components/shared/List'
import { NoCardMessage } from './style'

//Returns a Taboo card with buttons to change card status to other two options or a card stating there are no cards in this status
//status is correct, skipped or discarded with cardList an array of all cards from current round in this status.
//Selected is string of currently selected cards index. Used to determine which radio button to check
const CardsPlayed = ({ status, cardList, selected, handleChange, buttonInfo, error }) => {
	return (
		<ButtonTabooCard tabooWord={status} buttons={buttonInfo} error={error}>
			<List>
				{cardList.length > 0 ? (
					cardList.map((card) => {
						return (
							<RadioListItem
								key={card.index} //index in deck in firestore which is unchanging
								word={card.word}
								index={card.index}
								onChange={handleChange}
								status={status}
								checked={String(card.index) === selected}
							/>
						)
					})
				) : (
					<NoCardMessage>No {status} cards this round</NoCardMessage>
				)}
			</List>
		</ButtonTabooCard>
	)
}

CardsPlayed.propTypes = {
	status: PropTypes.string.isRequired,
	cardList: PropTypes.array.isRequired,
	selected: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	buttonInfo: PropTypes.array.isRequired,
	error: PropTypes.string,
}

export default CardsPlayed
