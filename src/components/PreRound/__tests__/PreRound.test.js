import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PreRound from '../PreRound'
import RoundInstructionsCard from 'components/RoundInstructionsCard'
import ScoreCard from 'components/ScoreCard'
import InstructionsText from 'components/shared/InstructionsText'

describe('PreRound renders and functions correctly', () => {
	const defaultProps = {
		teamScores: {
			team1: 3,
			team2: 5,
		},
		currentPlayer: {
			name: 'Sam',
			playerId: '12345',
		},
		round: 1,
		half: 'bottom',
		skipPenalty: 'half',
		endGameMethod: 'turns',
		endValue: 2,
		role: 'watcherTeam',
		giver: { name: 'Danielle', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Stephen', playerId: '34567', team: 'team 1' },
		startRound: jest.fn(),
		error: null,
	}
	jest.useFakeTimers()
	test('PreRound renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<PreRound {...props} />
				</ThemeProvider>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})

	test('PreRound renders a ScoreCard and RoundInstructionsCard when not first round and first half', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<PreRound {...props} />)

		expect(wrapper.find(ScoreCard)).toHaveLength(1)
		expect(wrapper.find(RoundInstructionsCard)).toHaveLength(1)
	})

	test('PreRound renders InstructionsText for 15 seconds during first half of first round', () => {
		const props = {
			...defaultProps,
			half: 'top',
		}
		jest.useFakeTimers()
		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<PreRound {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(PreRound)

		expect(component.find(InstructionsText)).toHaveLength(1)
		expect(component.find(RoundInstructionsCard)).toHaveLength(0)
		expect(component.find(ScoreCard)).toHaveLength(0)

		jest.advanceTimersByTime(16000)

		expect(component.contains(RoundInstructionsCard)).toBe(true)
		expect(component.contains(ScoreCard)).toBe(true)
	})
})
