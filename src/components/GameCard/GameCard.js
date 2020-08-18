import React from 'react'
import PropType from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import { InstructionsText, KeyWord } from './style'

export const GiverGameCard = ({ currentCard, changeCardStatus, isPending }) => {
	const buttonInfo = [
		{
			text: 'Skip!',
			disabled: isPending,
			onClick: () => {
				console.log('skip card')
				changeCardStatus('skipped')
			},
		},
		{
			text: 'Next!',
			disabled: isPending,
			onClick: () => {
				console.log("next")
				changeCardStatus('correct')
			},
		},
	]


	return <ButtonTabooCard buttons={buttonInfo} tabooWord={currentCard.word} list={currentCard.tabooList} />
}

GiverGameCard.propType = {
	currentCard: PropType.object.isRequired,
	changeCardStatus: PropType.func.isRequired,
	isPending: PropType.bool.isRequired
}

export const WatcherGameCard = ({currentCard, changeCardStatus, isPending}) => {
	const buttonInfo = [
		{
			text: 'Buzzer!',
			disabled: isPending,
			onClick: () => {
				console.log("discard")
				changeCardStatus('discard')
			}
		},
	]

	return <ButtonTabooCard buttons={buttonInfo} tabooWord={currentCard.word} list={currentCard.tabooList} />
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
						It’s the other team’s turn to give clues and guess! <KeyWord>{watcher.name}</KeyWord> will be
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
