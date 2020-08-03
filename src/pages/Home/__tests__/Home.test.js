import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Home from '../Home'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'

test('Home renders correctly', () => {
	const props = {
		match: {
			path: '/home',
		},
    }
    /* component contains switch, so MR required*/
	const wrapper = renderer
		.create(
            <ThemeProvider theme={theme}>
				<MemoryRouter> 
					<Home {...props} />
				</MemoryRouter>
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})
