import React from 'react'
import PropTypes from 'prop-types'
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
	currentCard: PropTypes.object.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	isPending: PropTypes.bool.isRequired,
	error: PropTypes.string,
	cardsRemainingMsg: PropTypes.string,
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
	currentCard: PropTypes.object.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	isPending: PropTypes.bool.isRequired,
	error: PropTypes.string,
	cardsRemainingMsg: PropTypes.string,
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
	role: PropTypes.string.isRequired,
	giver: PropTypes.string.isRequired,
	watcher: PropTypes.string.isRequired,
	cardsRemainingMsg: PropTypes.string,
}

export const GameCard = (props) => {
	const { giver, watcher, role, currentCard, isPending, changeCardStatus, cardsRemainingMsg, error } = props
	switch (role) {
		case 'giver':
			return (
				<GiverGameCard
					currentCard={currentCard}
					changeCardStatus={changeCardStatus}
					isPending={isPending}
					error={error}
					cardsRemainingMsg={cardsRemainingMsg}
				/>
			)
		case 'watcher':
			return (
				<WatcherGameCard
					currentCard={currentCard}
					changeCardStatus={changeCardStatus}
					isPending={isPending}
					error={error}
					cardsRemainingMsg={cardsRemainingMsg}
				/>
			)
		case 'giverTeam':
		case 'watcherTeam':
			//consider checking if card is changing for animation purposes
			return <TeamGameCard role={role} giver={giver} watcher={watcher} cardsRemainingMsg={cardsRemainingMsg} />
		default:
			return null
	}
}

GameCard.propType = {
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	role: PropTypes.string.isRequired,
	currentCard: PropTypes.object.isRequired,
	isPending: PropTypes.bool.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
	cardsRemainingMsg: PropTypes.string,
	error: PropTypes.string,
}
