import React from 'react'
import PropType from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import InstructionsText from 'components/shared/InstructionsText'
import KeyWord from 'components/shared/KeyWord'
import { ErrorMessage } from 'components/shared/FeedbackMessage'

export const GiverGameCard = ({ currentCard, changeCardStatus, isPending, error, cardsRemainingMsg }) => {
	const buttonInfo = [
		{
			text: 'Skip!',
			disabled: isPending,
			onClick: () => {
				changeCardStatus('skipped')
			},
		},
		{
			text: 'Next!',
			disabled: isPending,
			onClick: () => {
				changeCardStatus('correct')
			},
		},
	]
	//If there is an error, display it. Otherwise if there is a cardsRemainingMsg, display it. Otherwise display nothing
	const errorMsg = error ? error : cardsRemainingMsg ? cardsRemainingMsg : null
	return (
		<ButtonTabooCard
			buttons={buttonInfo}
			tabooWord={currentCard.word}
			list={currentCard.tabooList}
			error={errorMsg}
		/>
	)
}

GiverGameCard.propType = {
	currentCard: PropType.object.isRequired,
	changeCardStatus: PropType.func.isRequired,
	isPending: PropType.bool.isRequired,
	error: PropType.string,
}

export const WatcherGameCard = ({ currentCard, changeCardStatus, isPending, error, cardsRemainingMsg }) => {
	const buttonInfo = [
		{
			text: 'Buzzer!',
			disabled: isPending,
			onClick: () => {
				changeCardStatus('discard')
			},
		},
	]
	//If there is an error, display it. Otherwise if there is a cardsRemainingMsg, display it. Otherwise display nothing
	const errorMsg = error ? error : cardsRemainingMsg ? cardsRemainingMsg : null
	return (
		<ButtonTabooCard
			buttons={buttonInfo}
			tabooWord={currentCard.word}
			list={currentCard.tabooList}
			error={errorMsg}
		/>
	)
}

WatcherGameCard.propType = {
	currentCard: PropType.object.isRequired,
	changeCardStatus: PropType.func.isRequired,
	isPending: PropType.bool.isRequired,
}

export const TeamGameCard = ({ role, giver, watcher, cardsRemainingMsg }) => {
	return (
		<React.Fragment>
			{role === 'giverTeam' ? (
				<TabooCard tabooWord="Guess!">
					<InstructionsText>
						It's your teams turn to guess the word! <KeyWord>{giver.name}</KeyWord> is giving the clues and{' '}
						<KeyWord>{watcher.name}</KeyWord> will be making sure they don't say anything Taboo!
					</InstructionsText>
					{cardsRemainingMsg && <ErrorMessage error={cardsRemainingMsg} />}
				</TabooCard>
			) : (
				<TabooCard tabooWord="Relax!">
					<InstructionsText>
						It’s the other team’s turn to give clues and guess, so don't say anything!{' '}
						<KeyWord>{watcher.name}</KeyWord> will be watching to make sure <KeyWord>{giver.name}</KeyWord>{' '}
						doesn’t say any Taboo words.
					</InstructionsText>
					{cardsRemainingMsg && <ErrorMessage error={cardsRemainingMsg} />}
				</TabooCard>
			)}
		</React.Fragment>
	)
}

TeamGameCard.propType = {
	role: PropType.string.isRequired,
	giver: PropType.string.isRequired,
	watcher: PropType.string.isRequired,
}

export const GameCard = (props) => {
	switch (props.role) {
		case 'giver':
			return <GiverGameCard {...props} currentCard={props.currentCard} />
		case 'watcher':
			return <WatcherGameCard {...props} currentCard={props.currentCard} />
		case 'giverTeam':
		case 'watcherTeam':
			//consider checking if card is changing for animation purposes
			return <TeamGameCard {...props} />
		default:
			return null
	}
}

GameCard.propType = {
	gamecode: PropType.string.isRequired,
	deck: PropType.object.isRequired,
	role: PropType.string.isRequired,
	error: PropType.string,
	cardIndex: PropType.number.isRequired,
	changeCardStatus: PropType.func.isRequired,
	giver: PropType.object.isRequired,
	isPending: PropType.bool.isRequired,
	round: PropType.number.isRequired,
	watcher: PropType.object.isRequired,
}
