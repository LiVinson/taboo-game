import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RoundInfo from '../RoundInfo'

test('RoundInfo renders correctly', () => {
	const props = {
		round: 1,
		giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
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
