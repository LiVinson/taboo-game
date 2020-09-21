import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import List from "../List"

test('List renders children correctly ', () => {
	const list = ['item1', 'item2', 'item3']
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<List>
					{list.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</List>
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})
