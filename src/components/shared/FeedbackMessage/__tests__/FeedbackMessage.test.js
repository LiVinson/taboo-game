import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import { SuccessMessage, ErrorMessage } from '../FeedbackMessage'

describe('ErrorMessage', () => {
	const defaultProps = {
		error: 'Something has gome wrong.',
	}

	test('Renders correctly when large and light props not provided', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<ErrorMessage {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('Renders correctly when large and light props  provided', () => {
		const props = {
			...defaultProps,
			large: true,
			light: true,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<ErrorMessage {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})

describe('SuccessMessage', () => {
	const defaultProps = {
		message: 'Scores updated!',
	}

	test('Renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<SuccessMessage {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})
