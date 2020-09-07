import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PreRound from '../PreRound'
import RoundInstructionsCard from 'components/RoundInstructionsCard'
import ScoreCard from 'components/ScoreCard'

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
		role: 'watcherTeam',
		giver: { name: 'Danielle', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Stephen', playerId: '34567', team: 'team 1' },
		startRound: jest.fn(),
	}

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

	test('PreRound renders a ScoreCard and RoundInstructionsCard', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<PreRound {...props} />)

		expect(wrapper.find(ScoreCard)).toHaveLength(1)
		expect(wrapper.find(RoundInstructionsCard)).toHaveLength(1)
	})
})
