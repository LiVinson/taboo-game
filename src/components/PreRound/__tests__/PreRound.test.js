import React from 'react'
import renderer from 'react-test-renderer'
import PreRound from '../PreRound'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'

test('PreRound renders correctly', () => {
	const props = {
		role: 'watcherTeam',
		giver: { name: 'Danielle', playerId: 123 },
		watcher: { name: 'Stephen', playerId: 345 },
		startRound: jest.fn(),
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<PreRound {...props} />
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})
