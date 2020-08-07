import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import CreateGame from '../CreateGame'
// import createNewGame from "store/actions/__mocks__/createNewGame"
// import { createNewGame } from 'store/actions/gameActions'

	// jest.mock('store/actions/gameActions', () => ({
	// 	__esModule: true,
	// 	createNewGame: jest.fn().mockImplementation(()=> {
	// 		console.log("mock!")
	// 		Promise.resolve(true)
	// 	})
	// }))

	const mockStore = configureStore([])
	let store

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

	test('CreateGame renders without crashing', () => {
		const props = {
			history: {
				push: jest.fn(),
			},
			createNewGame: jest.fn(),
		}

		shallow(
			<Provider store={store}>
				<CreateGame {...props} />
			</Provider>
		)
	})

	test('CreateGame contains a form element and 2 buttons', () => {
		const props = {
			history: {
				push: jest.fn(),
			},
		}

		const wrapper = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CreateGame {...props} />
				</ThemeProvider>
			</Provider>
		)

		expect(wrapper.find('form').length).toBe(1)
		expect(wrapper.find('button').length).toBe(2)
	})

	test('navigates back to /home when back is selected', () => {
		const props = {
			history: {
				push: jest.fn(),
			},
			createNewGame: jest.fn(() => Promise.resolve()),
		}
		const wrapper = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<CreateGame {...props} />
				</ThemeProvider>
			</Provider>
		)
		wrapper.find('button').at(0).simulate('click')
		expect(props.history.push.mock.calls[0].length).toBe(1)
		//Check the argument the push method was called with (equals the new url)
		expect(props.history.push.mock.calls[0][0]).toBe('/home')
	})

	// test('Calls props.createNewGame with form data on submit', () => {
	// 	const props = {
	// 		history: {
	// 			push: jest.fn(),
	// 		},
	// 	}

	// 	const wrapper = mount(
	// 		<Provider store={store}>
	// 			<ThemeProvider theme={theme}>
	// 				<CreateGame {...props} />
	// 			</ThemeProvider>
	// 		</Provider>
	// 	)

	// 	//finds input field, and sets the name and value attributes
	// 	updateField(wrapper.find(CreateGame).find('input#name'), 'name', 'Sam')
	// 	wrapper.find('form').simulate('submit')

	// 	expect(createNewGame).toHaveBeenCalled()
	// })
// })
