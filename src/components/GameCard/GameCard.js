import React from 'react'
import PropType from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import { InstructionsText, KeyWord } from './style'


export const GiverGameCard = ({ currentCard, changeCardStatus, isPending, error }) => {
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


	return <ButtonTabooCard buttons={buttonInfo} tabooWord={currentCard.word} list={currentCard.tabooList} error={error} />
}

GiverGameCard.propType = {
	currentCard: PropType.object.isRequired,
	changeCardStatus: PropType.func.isRequired,
	isPending: PropType.bool.isRequired
}

export const WatcherGameCard = ({currentCard, changeCardStatus, isPending, error}) => {
	const buttonInfo = [
		{
			text: 'Buzzer!',
			disabled: isPending,
			onClick: () => {
				changeCardStatus('discard')
			}
		},
	]

	return <ButtonTabooCard buttons={buttonInfo} tabooWord={currentCard.word} list={currentCard.tabooList} error={error} />
}

WatcherGameCard.propType = {
	currentCard: PropType.object.isRequired,
	changeCardStatus: PropType.func.isRequired,
	isPending: PropType.bool.isRequired
}

export const TeamGameCard = ({ role, giver, watcher }) => {
	return (
		<React.Fragment>
			{role === 'giverTeam' ? (
				<TabooCard tabooWord="Guess!">
					<InstructionsText>
						It's your teams turn to guess the word! <KeyWord>{giver.name}</KeyWord> is giving the clues and{' '}
						<KeyWord>{watcher.name}</KeyWord> will be making sure they don't say anything Taboo!
					</InstructionsText>
				</TabooCard>
			) : (
				<TabooCard tabooWord="Relax!">
					<InstructionsText>
						It’s the other team’s turn to give clues and guess, so don't say anything! <KeyWord>{watcher.name}</KeyWord> will be
						watching to make sure <KeyWord>{giver.name}</KeyWord> doesn’t say any Taboo words.
					</InstructionsText>
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
	const currentCard = props.deck[props.cardIndex]
	switch (props.role) {
		case 'giver':
			return <GiverGameCard {...props} currentCard={currentCard} />
		case 'watcher':
			return <WatcherGameCard {...props} currentCard={currentCard} />
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
