import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import Rules from '../Rules'
import rulesText from '../rulesText'

test('Rules renders without crashing', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
	}

	shallow(<Rules {...props} />)
})

test('Rules render correctly', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
	}

	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<Rules {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('currentRule state decrement/increments on click of Back/Next button', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<Rules {...props} />
		</ThemeProvider>
	)
	wrapper.find('button').at(1).simulate('click')
	expect(wrapper.find(Rules).state('currentRule')).toBe(1)

	wrapper.find('button').at(0).simulate('click')
	expect(wrapper.find(Rules).state('currentRule')).toBe(0)
})

test("Rules navigates to homepage if 'back' is selected and first rule is already displayed", () => {
	const props = {
		history: {
			push: jest.fn(),
		},
	}
	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<Rules {...props} />
		</ThemeProvider>
	)
	wrapper.find('button').at(0).simulate('click')

	//Check that the history method was called
	expect(props.history.push.mock.calls[0].length).toBe(1)
	//Check the argument the push method was called with (equals the new url)
	expect(props.history.push.mock.calls[0][0]).toBe('/home')
})

test('Navigates to /home once all rules clicked through', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
	}
	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<Rules {...props} />
		</ThemeProvider>
	)

  //Click next for each rules in rules array
	rulesText.forEach((rule) => {
		wrapper.find('button').at(1).simulate('click')
	})
	//Check that the history method was called
	expect(props.history.push.mock.calls[0].length).toBe(1)
	//Check the argument the function was called with
	expect(props.history.push.mock.calls[0][0]).toBe('/home')
})
