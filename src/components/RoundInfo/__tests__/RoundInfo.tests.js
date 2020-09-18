import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RoundInfo from '../RoundInfo'

test('RoundInfo renders correctly for active player', () => {
	const props = {
		round: 1,
		giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
		currentPlayerId: "12345"
	}
	
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<RoundInfo {...props} />
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})

test('RoundInfo renders correctly for non-active player', () => {
	const props = {
		round: 1,
		giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
		currentPlayerId: "98765"
	}
	
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<RoundInfo {...props} />
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})