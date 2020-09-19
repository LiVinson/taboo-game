import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { PlayGame } from '../PlayGame'
import { game, gamecode } from '__fixtures__/game.js'
import Round from 'components/Round'
import LoadingCard from 'components/shared/LoadingCard'
import { ButtonErrorCard } from 'components/shared/ErrorCard'

console.log(game)
describe('PlayGame renders and functions correctly ', () => {
	const defaultProps = {
		match: {
			params: {
				gamecode,
			},
		},
		game,
		gameDataReceived: true,
		auth: {
			isLoaded: true,
			uid: '12345',
		},
		error: null,
		isPending: false,
		fetchDeck: jest.fn(),
	}

	test('PlayGame renders Round component once game loaded', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(<PlayGame {...props} />)

		//Set timeout is used to allow initial functions to finish running and setState to update
		setTimeout(() => {
			expect(component.find(Round).length).toBe(1)
		}, 100)
	})

	test('PlayGame redirects to EndGame when game status is completed', () => {
		const customProps = {
			...defaultProps,
			game: {
				...defaultProps.game,
				status: 'completed',
			},
		}

		//Using memory router to allow access to location for test
		const component = mount(
			<MemoryRouter initialEntries={[`/playgame/${gamecode}`]}>
				<Route render={(props) => <PlayGame {...customProps} {...props} />} />
			</MemoryRouter>
		)

		setTimeout(() => {
			expect(component.find(PlayGame).props().location.pathname).toBe(`/end/${gamecode}`)
		}, 100)
	})

	test('PlayGame renders Loading component while game setup is in progress', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(<PlayGame {...props} />)
		expect(component.find(LoadingCard).length).toBe(1)
	})

	test('PlayGame renders ErrorCard if game status is not "in progress"', () => {
		const props = {
			...defaultProps,
			game: {
				...defaultProps.game,
				status: 'new',
			},
		}
		const component = shallow(<PlayGame {...props} />)
		
		setTimeout(() => {
			expect(component.find(ButtonErrorCard).length).toBe(1)
		}, 100)
	})

	test('PlayGame renders ErrorCard if current user not a player in game', () => {
		
		const props = {
			...defaultProps,
			auth: {
				isLoaded: true,
				uid: '54321',
			},
		}
		const component = shallow(<PlayGame {...props} />)
		
		setTimeout(() => {
			expect(component.find(ButtonErrorCard).length).toBe(1)
		}, 100)
	})

	test('PlayGame renders Loading Card when isPending true', () => {
		const props = {
			...defaultProps,
			isPending: true
		}
		const component = shallow(<PlayGame {...props} />)
		expect(component.find(LoadingCard).length).toBe(1)
	})

	test('fetchDeck is called for host user once game and player verified', () => {
		const props = {
			...defaultProps,
		}
		shallow(<PlayGame {...props} />)
		
		setTimeout(() => {
			expect(props.fetchDeck).toHaveBeenCalled()
			expect(props.fetchDeck).toHaveBeenCalledWith(props.match.params.gamecode)

		}, 100)
		
	})
})
