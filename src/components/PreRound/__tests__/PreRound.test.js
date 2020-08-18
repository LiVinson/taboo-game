import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from "enzyme"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PreRound from '../PreRound'
import RoundInstructionsCard from "components/RoundInstructionsCard"
import ScoreCard from "components/ScoreCard"

test('PreRound renders correctly', () => {
	const props = {
		role: 'watcherTeam',
		giver: { name: 'Danielle', playerId: "12345", team: 'team 1' },
		watcher: { name: 'Stephen', playerId: "34567", team: 'team 1' },
		startRound: jest.fn(),
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
		role: 'watcherTeam',
		giver: { name: 'Danielle', playerId: "12345", team: 'team 1' },
		watcher: { name: 'Stephen', playerId: "34567", team: 'team 1' },
		startRound: jest.fn(),
	}
	const wrapper = shallow(<PreRound {...props} />)
							
	expect(wrapper.find(ScoreCard)).toHaveLength(1)
	expect(wrapper.find(RoundInstructionsCard)).toHaveLength(1)

})
