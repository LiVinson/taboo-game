import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import GameInfo from '../GameInfo'
import Rules from 'components/Rules'
import PlayerListCard from 'components/PlayerListCard'
import { Button } from 'components/shared/Button'

describe('Game Info rendering and functionality', () => {
	const defaultProps = {
		players: [
			{ name: 'Player 1', playerId: '12345', team: 'team 1' },
			{ name: 'Player 2', playerId: '23456', team: 'team 1' },
			{ name: 'Player 3', playerId: '34567', team: 'team 2' },
			{ name: 'Player 4', playerId: '45678', team: 'team 2' },
		],
		currentPlayer: { name: 'Player 1', playerId: '12345', team: 'team 1' },
    }
    
    const mockEvent = {
        target: {
            name: ""
        }
    }

	test('renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<GameInfo {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('contains 2 Buttons and no Rules or PlayerListCard components by default', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(
				<GameInfo {...props} />
		)

		expect(wrapper.dive().find(Button)).toHaveLength(2)
		expect(wrapper.dive().find(Rules)).toHaveLength(0)
		expect(wrapper.dive().find(PlayerListCard)).toHaveLength(0)
	})

	test('Rules and PlayerListCard components render when Show buttons clicked', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(
				<GameInfo {...props} />
		)

        //Call method that is called when button is clicked. Calling method directly instead of click to avoid using mount()
        mockEvent.target.name = "showRules"
        wrapper.instance().toggleGameInfo(mockEvent)
        
        mockEvent.target.name = "showTeams"
        wrapper.instance().toggleGameInfo(mockEvent)
     
		expect(wrapper.dive().find(Rules)).toHaveLength(1)
		expect(wrapper.dive().find(PlayerListCard)).toHaveLength(1)      
	})
})
