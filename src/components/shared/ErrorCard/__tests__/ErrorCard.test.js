import React from 'react'
import { ErrorCard, ButtonErrorCard } from '../ErrorCard'
import { MemoryRouter, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'

describe('ErrorCard and ButtonErrorCard', () => {
	const defaultProps = {
		error: 'Something went wrong',
	}

	test('ErrorCard renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<ErrorCard {...defaultProps} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})

describe('ButtonErrorCard', () => {
	const defaultProps = {
		error: 'Something went wrong',
		url: '/home',
		history: {
			push: jest.fn(),
		},
	}
	test('ButtonErrorCard renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<ButtonErrorCard {...defaultProps} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('should redirect to props.url on click of button', () => {
		const customProps = {
			...defaultProps,
		}
		//Using memory router to allow access to location for test
		const component = mount(
			<ThemeProvider theme={theme}>
				<MemoryRouter initialEntries={['/waiting/12345']}>
					<Route render={(props) => <ButtonErrorCard {...customProps} {...props} />} />
				</MemoryRouter>
			</ThemeProvider>
		)

        component.find("button").simulate("click")
		expect(component.find(ButtonErrorCard).props().location.pathname).toBe(`/home`)
	})
})
