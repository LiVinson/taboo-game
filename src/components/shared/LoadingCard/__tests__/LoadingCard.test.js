import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import LoadingCard from '../LoadingCard'

describe('LoadingCard', () => {
	const defaultProps = {
		message: 'Fetching deck',
	}

	test('renders correctly', () => {
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<LoadingCard {...defaultProps} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})
