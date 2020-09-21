import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import { Pending } from '../Pending'

describe('Pending', () => {
	const defaultProps = {
		message: 'Calculating scores',
	}

	test('Renders default Pending message correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<Pending {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('Renders large Pending message correctly', () => {
		const props = {
			...defaultProps,
			large: true,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<Pending {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('Adds elipses to message based on interval', () => {
		const props = {
			...defaultProps,
			speed: 500,
		}

		jest.useFakeTimers()
		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<Pending {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(Pending)
		expect(component.text()).toBe(props.message)
		jest.advanceTimersByTime(1500)
		expect(component.text()).toBe(props.message + '...')
	})
})
