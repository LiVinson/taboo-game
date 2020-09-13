import React from "react"
import PropTypes from "prop-types"
import { ButtonTabooCard } from 'components/shared/TabooCard'
import RadioListItem from "components/RadioListItem"
import List from "components/shared/List"
import { NoCardMessage } from "./style"


//Returns a Taboo card with buttons to change card status to other two options or a card stating there are no cards in this status
const CardsPlayed = ({ status, cardList, handleChange, buttonInfo, error }) => {
	console.log(error)
	return (
		<ButtonTabooCard tabooWord={status} buttons={buttonInfo} error={error}>
			<List>
				{cardList.length > 0 ? (
					cardList.map((card) => (
						<RadioListItem
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
			</List>
		</ButtonTabooCard>
	)
}

export default CardsPlayed