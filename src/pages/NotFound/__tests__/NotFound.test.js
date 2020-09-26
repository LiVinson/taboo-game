import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import NotFound from '../NotFound'

describe('NotFound component', () => {
	test('NotFound renders correctly', () => {
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<NotFound />
					</MemoryRouter>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})
})
