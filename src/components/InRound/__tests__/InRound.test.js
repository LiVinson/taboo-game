import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { InRound } from '../InRound'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'

describe('Inround rendering and functionality', () => {
	const defaultProps = {
		giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
		role: 'giver',
		deck: {
			0: {
				word: 'apple',
				tabooList: ['red', 'shiny', 'round', 'fruit', 'Eve'],
			},
			1: {
				word: 'banana',
				tabooList: ['yellow', 'fruit', 'monkey', 'peel', 'slip'],
			},
			2: {
				word: 'strawberry',
				tabooList: ['red', 'green', 'fruit', 'shortcake', 'cheesecake'],
			},
		},
		cardIndex: 0,
		isPending: false,
		changeCardStatus: jest.fn(),
	}

	test('renders correctly', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<InRound {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('renders TimeCard and GiverGame card when role is giver', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(<InRound {...props} />)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(GiverGameCard)).toHaveLength(1)
		expect(wrapper.find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(TeamGameCard)).toHaveLength(0)
	})

	test('renders TimeCard and WatcherGameCard when role is watcher', () => {
		const props = {
			...defaultProps,
			role: 'watcher',
		}

		const wrapper = shallow(<InRound {...props} />)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(WatcherGameCard)).toHaveLength(1)
		expect(wrapper.find(GiverGameCard)).toHaveLength(0)
		expect(wrapper.find(TeamGameCard)).toHaveLength(0)
	})

	test('renders TimeCard and TeamGameCard when role is giverTeam', () => {
		const props = {
			...defaultProps,
			role: 'giverTeam',
		}

		const wrapper = shallow(
				<InRound {...props} />
		)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(TeamGameCard)).toHaveLength(1)
		expect(wrapper.find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(GiverGameCard)).toHaveLength(0)
    })
    
    test('renders TimeCard and TeamGameCard when role is watcherTeam', () => {
		const props = {
			...defaultProps,
			role: 'watcherTeam',
		}

		const wrapper = shallow(
				<InRound {...props} />
		)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(TeamGameCard)).toHaveLength(1)
		expect(wrapper.find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(GiverGameCard)).toHaveLength(0)
	})
})
