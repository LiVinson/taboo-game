import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PlayerListCard from '../PlayerListCard'
import TeamList from 'components/TeamList'

test('renders correctly', () => {
	const props = {
		players: [
			{
				host: true,
				name: 'player1',
				playerId: '90210',
			},
			{
				host: false,
				name: 'player2',
				playerId: '12345',
			},
			{
				host: false,
				name: 'player3',
				playerId: '12345',
			},
			{
				host: false,
				name: 'player4',
				playerId: '12345',
			},
		],
		currentPlayer: {
			host: true,
			name: 'player1',
			playerId: '90210',
		},
		tabooWord: 'Players',
	}

	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<PlayerListCard {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('renders TeamList for team1, team2, and unassigned platersplayers', () => {
	const props = {
		players: [
			{
				host: true,
				name: 'player1',
				playerId: '90210',
				team: 'team 1',
			},
			{
				host: false,
				name: 'player2',
				playerId: '12345',
				team: 'team 1',
			},
			{
				host: false,
				name: 'player3',
				playerId: '12345',
				team: 'team 2',
			},
			{
				host: false,
				name: 'player4',
				playerId: '12345',
				team: null,
			},
		],
		currentPlayer: {
			host: true,
			name: 'player1',
			playerId: '90210',
			team: 'team 1',
		},
		tabooWord: 'Players',
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<PlayerListCard {...props} />
		</ThemeProvider>
	)

	expect(wrapper.find(TeamList)).toHaveLength(3)
})
