import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import JoinGame from '../JoinGame'
// jest.mock('react-redux')
const mockStore = configureStore([])
let store


//Used to update a formik field before submitting form
const updateField = (wrapper, name, value) => {
	wrapper.simulate('change', {
		persist: () => {},
		target: {
			name,
			value,
		},
	})
}

beforeEach(() => {
	store = mockStore({})
	store.dispatch = jest.fn()
})

test('JoinGame renders without crashing', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
		joinNewGame: (data) => store.dispatch(jest.fn(() => Promise.resolve('12345'))),
	}
	shallow(
		<Provider store={store}>
			<JoinGame.reactComponent {...props} />
		</Provider>
	)
})

test('JoinGame contains a form element and 2 buttons', () => {
	const props = {
		history: {
			push: jest.fn(),
		},
		joinNewGame: (data) => store.dispatch(jest.fn(() => Promise.resolve('12345'))),
	}
	const wrapper = mount(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<JoinGame {...props} />
			</ThemeProvider>
		</Provider>
	)

	expect(wrapper.find('form').length).toBe(1)
	expect(wrapper.find('button').length).toBe(2)
})

test('Join Game navigates back to /home when back is selected', () => {
	const props = {
		history: {
			push: jest.fn(),
			joinNewGame: (data) => store.dispatch(jest.fn(() => Promise.resolve('12345'))),
		},
	}
	const wrapper = mount(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<JoinGame {...props} />
			</ThemeProvider>
		</Provider>
	)
	wrapper.find('button').at(0).simulate('click')
	expect(props.history.push.mock.calls[0].length).toBe(1)
	//Check the argument the push method was called with (equals the new url)
	expect(props.history.push.mock.calls[0][0]).toBe('/home')
})

test('props.joinNewGame is called when form is submitted', () => {
	const props = {
		history: {
			push: jest.fn(),
			joinNewGame: (data) => store.dispatch(jest.fn(() => Promise.resolve('12345'))),
		},
  }
  
	const wrapper = mount(
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<JoinGame {...props} />
			</ThemeProvider>
		</Provider>
	)

	console.log(wrapper.find(JoinGame).props())

	//finds input field, and sets the name and value attributes
	// updateField(wrapper.find(JoinGame).find('input#name'), 'name', 'Sam')
	// updateField(wrapper.find(JoinGame).find('input#gamecode'), 'gamecode', 'F03156')
	// wrapper.find('form').simulate('submit')
	// expect(wrapper.find(JoinGame).props.joinNewGame).toHaveBeenCalled()
})
