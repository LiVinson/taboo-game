import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import TimeCard from '../TimeCard'
import { TimeText } from '../style'

describe('TimeCard rendering and functionality', () => {
	let defaultProps

	beforeEach(() => {
		jest.useFakeTimers()
		const currentTime = new Date()
		const endTime = currentTime.setTime(currentTime.getTime() + 60500)
		defaultProps = {
			roundEndTime: endTime,
			role: 'giver',
			endRound: jest.fn(),
		}
	})

	test('TimeCard renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<TimeCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Displays "Time is Up" message once time reaches 0', () => {
		const props = {
			...defaultProps,
			role: 'watcher',
		}

		const wrapper = shallow(<TimeCard theme={theme} {...props} />)

		//Mocking the setInterval. Makes it complete the timer before checking expect
		jest.runAllTimers()
		expect(wrapper.find(TimeText).text()).toBe("Time's Up!")
	})

	test('calls endRound once timer reaches 0 for the giver', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = shallow(<TimeCard theme={theme} {...props} />)

        expect(props.endRound).toHaveBeenCalledTimes(0)
		//Mocking the setInterval. Makes it complete the timer before checking expect
        jest.runAllTimers()
        expect(props.endRound).toHaveBeenCalledTimes(1)
        

    })

	test('does not call endRound once timer reaches 0 for player not the giver', () => {
		const props = {
            ...defaultProps,
            role:"giverTeam"
		}

		const wrapper = shallow(<TimeCard theme={theme} {...props} />)

        expect(props.endRound).toHaveBeenCalledTimes(0)
		//Mocking the setInterval. Makes it complete the timer before checking expect
        jest.runAllTimers()
        expect(props.endRound).toHaveBeenCalledTimes(0)

    })
})
