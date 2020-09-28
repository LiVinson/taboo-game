import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { Waiting } from '../Waiting'
import { ButtonErrorCard } from 'components/shared/ErrorCard'
import { TabooCardTop } from 'components/shared/TabooCard'
import PlayerListCard from 'components/PlayerListCard'
import InstructionsText from 'components/InstructionsText'
import { LargeButton } from 'components/shared/Button'

describe('Waiting component functions and renders correctly', () => {
	const gamecode = '123456'
	const players = [
		{
			host: true,
			name: 'player1',
			playerId: '90210',
			team: 'unassigned',
		},
		{
			host: false,
			name: 'player2',
			playerId: '12345',
			team: 'unassigned',
		},
		{
			host: false,
			name: 'player3',
			playerId: '12345',
			team: 'unassigned',
		},
		{
			host: false,
			name: 'player4',
			playerId: '12345',
			team: 'unassigned',
		},
	]
	const defaultProps = {
		match: {
			params: {
				gamecode,
			},
		},
		gameDataReceived: true,
		auth: {
			isLoaded: true,
			uid: '90210',
		},
		game: {
			[gamecode]: {
				status: 'new',
				players,
			},
		},
		error: {
			gameError: null,
			playersError: null,
		},
		isPending: {
			gameError: null,
			playersError: null,
		},
		updateTeam: jest.fn(),
		updateGameStatus: jest.fn(),
	}
	/*--------------------------- RENDERING BASED ON PROPS  ---------------------- */
	test('Waiting renders InstructionCard, TabooCard and PlayerListCard', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(
			<ThemeProvider theme={theme}>
				<Waiting {...props} />
			</ThemeProvider>
		)

		//Set timeout is used to allow initial functions to finish running and setState to update
		setTimeout(() => {
			expect(component.dive().find(InstructionsText).length).toBe(1)
			expect(component.dive().find(TabooCardTop).length).toBe(1)
			expect(component.dive().find(PlayerListCard).length).toBe(1)
		}, 100)
	})

	test('Waiting renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<Waiting {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('When game is undefined, Waiting renders correct Error message', () => {
		const props = {
			...defaultProps,
			game: {
				[gamecode]: null,
			},
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<Waiting {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(Waiting)

		setTimeout(() => {
			expect(component.dive().find(ButtonErrorCard).length).toBe(1)
		}, 100)
	})

	test("When game status is not 'new' Waiting renders correct Error message", () => {
		const customProps = {
			...defaultProps,
			game: {
				[gamecode]: {
					...defaultProps.game[gamecode],
					status: 'in progress',
				},
			},
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<MemoryRouter initialEntries={[`/waiting/123456`]}>
					<Route render={(props) => <Waiting {...customProps} {...props} />} />
				</MemoryRouter>
			</ThemeProvider>
		)

		//Set timeout is used to allow initial functions to finish running and setState to update
		setTimeout(() => {
			expect(wrapper.find(Waiting).props().location.pathname).toBe('/play/123456')
		}, 100)
	})

	test('When current user is not game player, correct Error message is displayed', () => {
		const props = {
			...defaultProps,
			auth: {
				isLoaded: true,
				uid: '32811',
			},
		}

		const wrapper = shallow(
			<ThemeProvider theme={theme}>
				<Waiting {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(Waiting)

		setTimeout(() => {
			expect(component.dive().find(ButtonErrorCard).length).toBe(1)
		}, 100)
	})

	test('PlayGame button is disabled if not all teams assigned', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<Waiting {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(Waiting)

		setTimeout(() => {
			const PlayButton = component.find(LargeButton)
			expect(PlayButton.find('button').prop('disabled')).toEqual(true)
		}, 100)
	})

	test('PlayGame enabled if all players assigned', () => {
		const updatedPlayers = players.map((player, index) => {
			const newPlayer = {...player}
			if (index % 2 === 0) {
				newPlayer.team = 'team 1'
			} else {
				newPlayer.team = 'team 2'
			}
			return newPlayer
		})
		const props = {
			...defaultProps,
			game: {
				[gamecode]: {
					status: 'new',
					players: updatedPlayers,
				},
			},
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<Waiting {...props} />
			</ThemeProvider>
		)
		const component = wrapper.find(Waiting)

		setTimeout(() => {
			const PlayButton = component.find(LargeButton)
			expect(PlayButton.find('button').prop('disabled')).toEqual(false)
		}, 100)
	})
	
	/*--------------------------- METHOD FUNCTIONALITY  ---------------------- */

	test("handleTeamClick calls this.props.updateTeam", () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Waiting {...props} />)
		const event = {
			target: {
				value: "team 1" 
			}
		}
		wrapper.instance().handleTeamClick(event)
		expect(props.updateTeam).toHaveBeenCalled()
		expect(props.updateTeam).toHaveBeenCalledWith(gamecode, props.auth.uid, "team 1" )


	})

	test("handlePlayGame calls this.props.updateGameStatus", () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Waiting {...props} />)

		wrapper.instance().handlePlayGame()
		expect(props.updateGameStatus).toHaveBeenCalled()
		expect(props.updateGameStatus).toHaveBeenCalledWith(gamecode)
	})

	test("VerifyTeamStatus returns true if players unassigned", () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<Waiting {...props} />)

		const returnValue = wrapper.instance().verifyTeamStatus(props.game[gamecode].players)
		expect(returnValue).toBe(true)
	})

	test("VerifyTeamStatus returns true if uneven teams", () => {

		const updatedPlayers = players.map((player, index) => {
			const newPlayer = {
				...player
			}
			if (index === 0) {
				newPlayer.team = 'team 1'
			} else {
				newPlayer.team = 'team 2'
			}
			return newPlayer
		})

		const props = {
			...defaultProps,
			game: {
				[gamecode]: {
					status: 'new',
					players: updatedPlayers,
				},
			},
		}
		const wrapper = shallow(<Waiting {...props} />)

		const returnValue = wrapper.instance().verifyTeamStatus(props.game[gamecode].players)
		expect(returnValue).toBe(true)
	})

	test("VerifyTeamStatus returns false if all palyers assigned and teams are even if uneven teams", () => {

		const updatedPlayers = players.map((player, index) => {
			const newPlayer = {...player}
			if (index % 2 === 0) {
				newPlayer.team = 'team 1'
			} else {
				newPlayer.team = 'team 2'
			}
			return newPlayer
		})

		const props = {
			...defaultProps,
			game: {
				[gamecode]: {
					status: 'new',
					players: updatedPlayers,
				},
			},
		}
		const wrapper = shallow(<Waiting {...props} />)

		const returnValue = wrapper.instance().verifyTeamStatus(props.game[gamecode].players)
		expect(returnValue).toBe(false)
	})
})
