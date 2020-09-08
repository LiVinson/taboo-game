import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { PostRound } from '../PostRound'
import PostRoundNonWatcher from 'components/PostRoundNonWatcher'
import PostRoundWatcher from 'components/PostRoundWatcher'

describe('PostRound renders and functions correctly', () => {
	const defaultProps = {
		gamecode:"12345",
		role: 'watcher',
		cardsPlayed: [
			{
				index: 0,
				status: 'correct',
				tabooList: ['rapper', 'West Coast', 'Compton', 'Humble', 'Good Kid'],
				word: 'Kendrick Lamar',
				roundPlayed: '1-top',
			},
			{
				index: 1,
				status: 'skipped',
				tabooList: ['Lion King', 'Disney', 'Mufasa', 'Pride Rock', 'Nala'],
				word: 'Simba',
				roundPlayed: '1-top',
			},
			{
				index: 2,
				status: 'discard',
				tabooList: ['Fresh Prince', 'Philadelphia', 'Jazzy Jeff', 'Independence Day', 'Jada Pinkett'],
				word: 'Will Smith',
				roundPlayed: '1-top',
			},
		],
		
		isPending: false,
	  pendingMsg: null,
		changeCardStatus: jest.fn(),
		completeRound: jest.fn(),
	}

	test('PostRound renders correctly when role is watcher', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<PostRound {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})
	test('PostRound renders correctly when role is not watcher', () => {
		const props = {
			...defaultProps,
			role: 'giver',
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<PostRound {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('renders PostRoundWatcher when role is watcher', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<PostRound {...props} />
			</ThemeProvider>
		)

		expect(wrapper.dive().find(PostRound).dive().find(PostRoundWatcher)).toHaveLength(1)
		expect(wrapper.dive().find(PostRound).dive().find(PostRoundNonWatcher)).toHaveLength(0)
	})

	test('renders PostRoundNonWatcher when role is not watcher', () => {
		const props = {
			...defaultProps,
			role: 'giver',
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<PostRound {...props} />
			</ThemeProvider>
		)
		expect(wrapper.dive().find(PostRound).dive().find(PostRoundWatcher)).toHaveLength(0)
		expect(wrapper.dive().find(PostRound).dive().find(PostRoundNonWatcher)).toHaveLength(1)
	})

	//---------Method tests --------//
	// test('handleCardSelection updates state when called based on status', () => {
	// 	const props = {
	// 		...defaultProps,
	// 	}
	// 	const wrapper = shallow(<PostRound {...props} />)

	// 	wrapper.instance().handleCardSelection()
	// })

	test('updateSelectedCard calls props.changeCardStatus with new status and card index', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<PostRound {...props} />)

		wrapper.instance().updateSelectedCard()
		expect(props.changeCardStatus).toHaveBeenCalled()

	})
})
