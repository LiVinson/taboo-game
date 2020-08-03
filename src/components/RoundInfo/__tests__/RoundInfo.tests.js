import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RoundInfo from '../RoundInfo'

test('RoundInfo renders correctly', () => {
	const props = {
		round: '3',
		giver: 'Sam',
		watcher: 'Jo',
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
