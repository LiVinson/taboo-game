import React from 'react'
import { shallow } from 'enzyme'
import { game, gamecode } from '__fixtures__/game.js'
import { assignedPlayers } from '__fixtures__/players.js'
import { deck } from '__fixtures__/deck'
import { Round } from '../Round'
import GameInfo from 'components/GameInfo'
import RoundInfo from 'components/RoundInfo'
import PreRound from 'components/PreRound'
import InRound from 'components/InRound'
import PostRound from 'components/PostRound'

describe('Round renders and functions correctly ', () => {
	const { gameplay } = game
	gameplay.deck = deck

	const defaultProps = {
		gamecode,
		players: assignedPlayers,
		gameplay,
		playerId: '12345',
		error: null,
		updateRoundStatus: jest.fn(),
	}

	test('Round renders GameInfo and RoundInfo components', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(<Round {...props} />)

		expect(component.find(GameInfo).length).toBe(1)
		expect(component.find(RoundInfo).length).toBe(1)
	})

	test('Round renders PreRound component when round status is preround', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(<Round {...props} />)

		expect(component.find(PreRound).length).toBe(1)
		expect(component.find(InRound).length).toBe(0)
		expect(component.find(PostRound).length).toBe(0)
	})

	test('Round renders InRound component when round status is in progress', () => {
		const updatedGamePlay = { ...gameplay, status: 'in progress' }
		const props = {
			...defaultProps,
			gameplay: updatedGamePlay,
		}
		const component = shallow(<Round {...props} />)

		expect(component.find(PreRound).length).toBe(0)
		expect(component.find(InRound).length).toBe(1)
		expect(component.find(PostRound).length).toBe(0)
	})

	test('Round renders PostRound component when round status is postround', () => {
		const updatedGamePlay = { ...gameplay, status: 'postround' }
		const props = {
			...defaultProps,
			gameplay: updatedGamePlay,
		}
		const component = shallow(<Round {...props} />)

		expect(component.find(PreRound).length).toBe(0)
		expect(component.find(InRound).length).toBe(0)
		expect(component.find(PostRound).length).toBe(1)
	})
})
