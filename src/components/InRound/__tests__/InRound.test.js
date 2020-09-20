import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { InRound } from '../InRound'
import { GameCard } from 'components/GameCard'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'
import { deck } from "__fixtures__/deck"
jest.mock('moment', () => {
	return () => jest.requireActual('moment')('2020-09-01T00:00:00.000Z')
})

describe('Inround rendering and functionality', () => {
	const date = new Date()
	const endTime = date.setSeconds(date.getSeconds() + 30)
	const defaultProps = {
		gamecode: '90210',
		giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
		round: 1,
		role: 'giver',
		roundEndTime: endTime,
		deck,
		cardIndex: 0,
		isPending: false,
		changeCardStatus: jest.fn(),
		error: {
			cardError: null,
			roundError: null
		}
	}

	test('renders correctly', () => {
		console.log(defaultProps.roundEndTime)
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
		expect(wrapper.find(GameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(GiverGameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(TeamGameCard)).toHaveLength(0)
	})

	test('renders TimeCard and WatcherGameCard when role is watcher', () => {
		const props = {
			...defaultProps,
			role: 'watcher',
		}

		const wrapper = shallow(<InRound {...props} />)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(GameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(GiverGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(WatcherGameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(TeamGameCard)).toHaveLength(0)
	})

	test('renders TimeCard and TeamGameCard when role is giverTeam', () => {
		const props = {
			...defaultProps,
			role: 'giverTeam',
		}

		const wrapper = shallow(<InRound {...props} />)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(GameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(GiverGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(TeamGameCard)).toHaveLength(1)
	})

	test('renders TimeCard and TeamGameCard when role is watcherTeam', () => {
		const props = {
			...defaultProps,
			role: 'watcherTeam',
		}

		const wrapper = shallow(<InRound {...props} />)

		expect(wrapper.find(TimeCard)).toHaveLength(1)
		expect(wrapper.find(GameCard)).toHaveLength(1)
		expect(wrapper.find(GameCard).shallow().find(GiverGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(WatcherGameCard)).toHaveLength(0)
		expect(wrapper.find(GameCard).shallow().find(TeamGameCard)).toHaveLength(1)
	})
})
