import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
	test('renders correctly', () => {
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<LoadingSpinner />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})
