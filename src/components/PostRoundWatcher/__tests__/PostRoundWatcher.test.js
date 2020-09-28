import React from 'react'
import { shallow } from 'enzyme'
import PostRoundWatcher from 'components/PostRoundWatcher'
import { generateCardsPlayedButtonInfo } from '../PostRoundWatcher'
import InstructionsText from 'components/shared/InstructionsText'
import CardsPlayed from 'components/CardsPlayed'
import { LargeButton } from 'components/shared/Button'
import { ErrorMessage } from 'components/shared/FeedbackMessage'
import { deck } from '__fixtures__/deck'

describe('PostRoundWatcher', () => {
	const deckArray = Object.values(deck).map((card, index) => ({ ...card, index }))

	const defaultProps = {
		cardStatuses: ['correct', 'skipped', 'discard'],

		cardsPlayed: deckArray,
		handleCardSelection: jest.fn(),
		selectedCards: ['', '', ''],
		updateSelectedCard: jest.fn(),
		confirmRoundEnd: jest.fn(),
		isPending: {
			cards: false,
			round: false,
		},
		error: {
			cards: false,
			round: false,
		}
	}

	test('renders InstructionsText, 3 CardsPlayed, and LargeButton component', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<PostRoundWatcher {...props} />)
		expect(wrapper.find(InstructionsText)).toHaveLength(1)
		expect(wrapper.find(CardsPlayed)).toHaveLength(3)
		expect(wrapper.find(LargeButton)).toHaveLength(1)
	})

	test('Confirm button is disabled when isPending.round is true', () => {
		const props = {
			...defaultProps,
			isPending: {
				cards: false,
				round: true,
			},
		}
		const wrapper = shallow(<PostRoundWatcher {...props} />)
        const PlayButton = wrapper.find(LargeButton)
		expect(PlayButton.prop('disabled')).toEqual(true)
	})

	test('Displays error message when error.round exists', () => {
        const props = {
            ...defaultProps,
            error: {
                round: "There was a problem changing rounds",
                cards: null
            }
        }
		const wrapper = shallow(<PostRoundWatcher {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(1)


    })
})

describe('generateCardsPlayedButton', () => {
	const cardStatuses = ['correct', 'skipped', 'discard']
	const updateSelectedCard = jest.fn()


	test('returns array of button objects with correct properties when no card selected', () => {
        const selectedIndex = ""
        const isPending = false
        const buttonArray = generateCardsPlayedButtonInfo(
			cardStatuses,
			'correct',
			selectedIndex,
			updateSelectedCard,
			isPending
		)
        expect(buttonArray[0].disabled).toEqual(true)
        expect(buttonArray[0].disabled).toEqual(true)
        expect(buttonArray[0].text).toEqual("skipped")
        expect(buttonArray[1].text).toEqual("discard")
    })
    
    test('returns array of button objects with correct properties when card is selected', () => {
        const selectedIndex = "0"
        const isPending = false

        const buttonArray = generateCardsPlayedButtonInfo(
			cardStatuses,
			'correct',
			selectedIndex,
			updateSelectedCard,
			isPending
		)
        expect(buttonArray[0].disabled).toEqual(false)
        expect(buttonArray[0].disabled).toEqual(false)
        expect(buttonArray[0].text).toEqual("skipped")
        expect(buttonArray[1].text).toEqual("discard")
    })

    test('returns array of button objects with correct properties when card is selected', () => {
        const selectedIndex = ""
        const isPending = true

        const buttonArray = generateCardsPlayedButtonInfo(
			cardStatuses,
			'correct',
			selectedIndex,
			updateSelectedCard,
			isPending
		)
        expect(buttonArray[0].disabled).toEqual(true)
        expect(buttonArray[0].disabled).toEqual(true)
        expect(buttonArray[0].text).toEqual("skipped")
        expect(buttonArray[1].text).toEqual("discard")
    })

})
