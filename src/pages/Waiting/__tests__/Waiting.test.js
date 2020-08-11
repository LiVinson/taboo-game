import React from 'react'
// import Waiting from "../Waiting"
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { Waiting } from '../Waiting'

const gamecode = '123456'
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
			players: [
				{
					host: true,
					name: 'player1',
					playerId: '90210',
				},
				{
					host: false,
					name: 'player2',
					playerId: '12345',
				},
				{
					host: false,
					name: 'player3',
					playerId: '12345',
				},
				{
					host: false,
					name: 'player4',
					playerId: '12345',
				},
			],
		},
	},
	updateTeam: jest.fn(),
	handleTeamClick: jest.fn(),
	updateGameStatus: jest.fn(),
}
/*------- Unconnected version of Waiting Component --------- */
test('Waiting renders without crashing', () => {
	const props = defaultProps
	shallow(<Waiting {...props} />)
})

/*
    snapshot render:

*/
// test("Waiting renders correctly", () => {
//     const props = defaultProps
//     const wrapper = renderer.create(
//         <ThemeProvider theme={theme}>
//             <Waiting {...props}/>
//         </ThemeProvider>
//     ).toJSON()

//     expect(wrapper).toMatchSnapshot()
// })

/*
VerifyGameInfo: 
If game is undefined, state.loading is false and <p>Player didn't join properly</p> is rendered
If game status is not new, state.loading is false and <p>Player didn't join properly</p> is rendered
If playerId is not included in in game.players loading is false, gameVerified true, playerVerified false, <p>Player didn't join properly</p>
If playerId is included in game.players, render Instructions, PlayerListCard
*/
describe("verifyGame Method functionality is correct", () => {
    test("When game is undefined, Waiting renders correct Error message", () => {

    })

    test("When game status is not 'new' Waiting renders correct Error message", () => {

    })

    test("When current user is not game player, correct Error message is displayed", () => {

    })

    test("When current user is a game player, PlayerListCard is rendered", () => {

    })
})

/*
    handleTeamClick()
        If player currently on team: player still on team
        If player not currently on team: calls this.props.updateTeam with gamecode and newTeam value
*/

describe("handleTeamClick functions correctly", () => {
    test("Team does not change if player is already on selected team", ()=> {

    })

    test("If player is not on selected team, this.props.updateTeam is called ", ()=> {

    })
})
/*
    handlePlayGame()
        players unassigned: message there are unassigned players
        < 2 players on a team: message: at least 2 players per team are required 
        > 2 players, all assigned: this.props.updateGameStatus is called
*/

describe("handlePlayGame functions correctly", () => {
    test("If any players are unassigned, correct message displays  ", ()=> {

    })

    test("If fewer than two players on either team, correct message displays ", ()=> {

    })

    test("If all players are assigned, app routes to play/:gamecode", ()=> {

    })
})