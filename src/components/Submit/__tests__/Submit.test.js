import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { Submit } from '../Submit'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import SubmitCardForm from 'components/SubmitCardForm'
import Pending from 'components/shared/Pending'
import { ErrorMessage } from 'components/shared/FeedbackMessage'

describe('Submit functionality and rendering', () => {
	const defaultProps = {
		history: {
			push: jest.fn(),
		},
		error: null,
		isPending: false,
		submitCardIdea: jest.fn(() => Promise.resolve()),
	}

	const formValues = {
		tabooWord: 'Will Smith',
		word1: 'Fresh Prince',
		word2: 'Bel-Air',
		word3: 'Jada Pinkett',
		word4: '',
		word5: '',
	}

	const actionsMock = {
		setSubmitting: jest.fn(),
		resetForm: jest.fn(),
	}

	//Used for flashing success message
    beforeEach(() => {
		jest.useFakeTimers()
		
	})

	test('Submit renders without crashing', () => {
		const props = {
			...defaultProps,
		}
		shallow(<Submit {...props} />)
	})

	/* ---------------------SNAPSHOT TESTS & RENDERING ------------------------------- */
	test('Submit renders correctly with default props', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<Submit {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Submit renders correctly with isPending props true', () => {
		const props = {
			...defaultProps,
			isPending: true,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<Submit {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Submit renders a ButtonTabooCard with a Form', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<Submit {...props} />
			</ThemeProvider>
		)
		//Need to use find to access Submit due to ThemeProvider wrapper and use .dive() for child components due to shallow rendering
		const component = wrapper.find(Submit)
		expect(component.dive().find(ButtonTabooCard).length).toBe(1)
		expect(component.dive().find(SubmitCardForm).length).toBe(1)
	})

	/* --------------------- FUNCTIONALITY & PROPS ------------------------------- */
	test('Submit navigates back to /home when handleBackClick is called', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Submit {...props} />)

		wrapper.instance().handleBackClick()
		expect(props.history.push).toHaveBeenCalled()
		expect(props.history.push).toHaveBeenCalledWith('/home')
	})

	test('Calls props.submitCardIdea with form data on submit', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(<Submit {...props} />)

		wrapper.instance().handleSubmit(formValues, actionsMock)
		//setTimout gives time for the React.setState to run and it's callback before running test
		setTimeout(() => {
			const state = { ...wrapper.state(), successMsg: '' }

			expect(props.submitCardIdea).toHaveBeenCalled()
			expect(props.submitCardIdea).toHaveBeenCalledWith(state)
			expect(actionsMock.setSubmitting).toHaveBeenCalled()
			expect(actionsMock.resetForm).toHaveBeenCalled()
		}, 75)
	})

	test('Does not render Pending component when props.isPending is false', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Submit {...props} />)
		expect(wrapper.find(Pending)).toHaveLength(0)
	})

	test('renders Pending component when props.isPending is true', () => {
		const props = {
			...defaultProps,
			isPending: true,
		}
		const wrapper = shallow(<Submit {...props} />)
		expect(wrapper.find(Pending)).toHaveLength(1)
	})

	test('Does not render ErrorMessage component when props.isPending is false', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Submit {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(0)
	})

	test('renders ErrorMessage component when props.isPending is true', () => {
		const props = {
			...defaultProps,
			error: 'There was an error submitting card idea.',
		}
		const wrapper = shallow(<Submit {...props} />)
		expect(wrapper.find(ErrorMessage)).toHaveLength(1)
	})
})
