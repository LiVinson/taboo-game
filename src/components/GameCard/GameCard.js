import React from 'react'
import PropType from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import { InstructionsText, KeyWord } from './style'

//current card object, skip and next callback.
export const GiverGameCard = ({ changeCardStatus }) => {
	const buttonInfo = [
		{
			text: 'Skip!',
			onClick: () => {
				console.log('skip card')
				console.log("next")
				changeCardStatus('Skip card')
			},
		},
		{
			text: 'Next!',
			onClick: () => {
				console.log("next")
				changeCardStatus('Next card')
			},
		},
	]

	const card = {
		tabooWord: 'Simba',
		words: ['Lion King', 'Disney', 'Mufasa', 'Pride Rock', 'Nala'],
	}

	return <ButtonTabooCard buttons={buttonInfo} tabooWord={card.tabooWord} list={card.words} />
}

export const WatcherGameCard = () => {
	const buttonInfo = [
		{
			text: 'Buzzer!',
			onClick: () => {
				console.log('Buzz')
			},
		},
	]

	const card = {
		tabooWord: 'Simba',
		words: ['Lion King', 'Disney', 'Mufasa', 'Pride Rock', 'Nala'],
	}

	return <ButtonTabooCard buttons={buttonInfo} tabooWord={card.tabooWord} list={card.words} />
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
