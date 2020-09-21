import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import CardsPlayed from '../CardsPlayed'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import RadioListItem from 'components/RadioListItem'
import List from 'components/shared/List'
import { cardsPlayed } from '__fixtures__/deck'
import { generateCardsPlayedButtonInfo } from 'components/PostRoundWatcher/PostRoundWatcher'

describe('CardsPlayed', () => {
	const cardStatuses = ['correct', 'skipped', 'discard']
	const buttonInfo = generateCardsPlayedButtonInfo(cardStatuses, 'correct', '', jest.fn(), false)
	const defaultProps = {
		status: 'correct',
		cardList: cardsPlayed.filter(card => card.status === "correct"),
		handleChange: jest.fn(),
		buttonInfo,
		error: null,
	}

	test('Snapshot', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<CardsPlayed {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('Renders a ButtonTabooCard', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(<CardsPlayed {...props} />)
		expect(wrapper.find(ButtonTabooCard)).toHaveLength(1)
	})

	test('Renders a RadioListItem for each card in the status category', () => {
		const props = {
			...defaultProps,
		}

        const wrapper = shallow(<CardsPlayed {...props} />)
        expect(wrapper.find(ButtonTabooCard).dive().find(List).dive().find(RadioListItem)).toHaveLength(2)
	})

	test('Renders NoCardMessage when no cards in the specified status', () => {
		const props = {
            ...defaultProps,
            cardList: defaultProps.cardList.filter(card => card.status !== "correct")
		}
        const wrapper = shallow(<CardsPlayed {...props} />)
        expect(wrapper.find(ButtonTabooCard).dive().find(List).shallow().text()).toBe("No correct cards this round")

	})
})
