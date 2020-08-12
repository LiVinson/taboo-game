import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { CreateGame } from '../CreateGame'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import CreateGameForm from 'components/CreateGameForm'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'

//*NOTE*: randomatic npm package is mocked to return CODE00 for gamecode

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
			isPending: true,
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
			error: new Error('There was an error creating game.'),
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

	test('CreateGame renders a ButtonTabooCard with a Form', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<CreateGame {...props} />
			</ThemeProvider>
		)
		//Need to use find to access CreateGame due to ThemeProvider wrapper and use .dive() for child components due to shallow rendering
		const component = wrapper.find(CreateGame)
		expect(component.dive().find(ButtonTabooCard).length).toBe(1)
		expect(component.dive().find(CreateGameForm).length).toBe(1)

	})

	/* --------------------- FUNCTIONALITY & PROPS ------------------------------- */

	test('navigates back to /home when handleBackClick is called', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<CreateGame {...props} />)

		wrapper.instance().handleBackClick()
		expect(props.history.push).toHaveBeenCalled()
		expect(props.history.push).toHaveBeenCalledWith('/home')
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
			error: new Error('There was an error creating game.'),
		}
		const wrapper = shallow(<CreateGame {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(1)
	})

	test('CreateGame calls props.clearGameErrors on unmount', () => {
		const props = {
			...defaultProps,
			error: new Error('There was an error creating game.'),
		}
		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<CreateGame {...props} />
			</ThemeProvider>
		)
		wrapper.unmount()
		expect(props.clearGameErrors).toHaveBeenCalled()
	})
})
