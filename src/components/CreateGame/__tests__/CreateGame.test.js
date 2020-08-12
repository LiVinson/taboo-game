import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { CreateGame } from '../CreateGame'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'


//Snapshot testing based on prop values 


describe('CreateGame functionality and rendering', () => {
	const defaultProps = {
		history: {
			push: jest.fn(),
		},
		error: null,
		isPending: false,
		gamecode: '',
		createNewGame: jest.fn(() => Promise.resolve()),
		clearGameErrors: jest.fn(),
	}

	const formValues = {
		name: 'Sam',
		endGameMethod: 'turns',
		turnsValue: 2,
		timeValue: 60,
		skipPenalty: false,
	}

	test('CreateGame renders without crashing', () => {
		const props = {
			...defaultProps,
		}

		shallow(<CreateGame {...props} />)
	})

	/* ---------------------SNAPSHOT TESTS & RENDERING ------------------------------- */
	test('CreateGame renders correctly with default props', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<CreateGame {...props} />
				</ThemeProvider>
			)
			.toJSON()
	
		expect(wrapper).toMatchSnapshot()
	})

	test('CreateGame renders correctly with isPending props true', () => {
		const props = {
			...defaultProps,
			isPending: true
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<CreateGame {...props} />
				</ThemeProvider>
			)
			.toJSON()
	
		expect(wrapper).toMatchSnapshot()
	})

	test('CreateGame renders correctly with error props true', () => {
		const props = {
			...defaultProps,
			error : new Error("There was an error creating game.")
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<CreateGame {...props} />
				</ThemeProvider>
			)
			.toJSON()
	
		expect(wrapper).toMatchSnapshot()
	})


	test('CreateGame contains a form element and 2 buttons', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<CreateGame {...props} />
			</ThemeProvider>
		)

		expect(wrapper.find('form').length).toBe(1)
		expect(wrapper.find('button').length).toBe(2)
	})

		/* --------------------- FUNCTIONALITY & PROPS ------------------------------- */

	test('navigates back to /home when back is selected', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<CreateGame {...props} />
			</ThemeProvider>
		)
		wrapper.find('button').at(0).simulate('click')
		expect(props.history.push.mock.calls[0].length).toBe(1)
		//Check the argument the push method was called with (equals the new url)
		expect(props.history.push.mock.calls[0][0]).toBe('/home')
	})

	test('Calls props.createNewGame with form data on submit', () => {
		const props = {
			...defaultProps,
		}

		const setSubmittingMock = jest.fn()

		const wrapper = shallow(<CreateGame {...props} />)

		wrapper.instance().handleSubmit(formValues, setSubmittingMock)
		//setTimout gives time for the React.setState to run and it's callback before running test
		setTimeout(() => {
			const { endGameMethod, endValue, skipPenalty, name } = wrapper.state()
			const gameData = {
				status: 'new',
				endGameMethod,
				endValue,
				skipPenalty,
				players: [],
			}
			expect(props.createNewGame).toHaveBeenCalled()
			expect(props.createNewGame).toHaveBeenCalledWith('CODE00', gameData, name)
		}, 75)
	})

	test('Does not render Pending component when props.isPending is false', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<CreateGame {...props} />)
		expect(wrapper.find(Pending)).toHaveLength(0)
	})

	test('renders Pending component when props.isPending is true', () => {
		const props = {
			...defaultProps,
			isPending: true,
		}
		const wrapper = shallow(<CreateGame {...props} />)
		expect(wrapper.find(Pending)).toHaveLength(1)
	})

	test('Does not render ErrorMessage component when props.isPending is false', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<CreateGame {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(0)
	})

	test('renders ErrorMessage component when props.isPending is true', () => {
		const props = {
			...defaultProps,
			error : new Error("There was an error creating game.")
		}
		const wrapper = shallow(<CreateGame {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(1)
	})
})
