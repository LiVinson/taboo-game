import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { EndGame } from '../EndGame'
import { completeGame, gamecode } from '__fixtures__/game.js'
import PlayerListCard from 'components/PlayerListCard'
import ScoreCard from 'components/ScoreCard'
import LoadingCard from 'components/shared/LoadingCard'
import { ButtonErrorCard } from 'components/shared/ErrorCard'

describe('EndGame', () => {
	const defaultProps = {
		match: {
			params: {
				gamecode,
			},
		},
		game: completeGame,
		gameDateReceived: true,
		auth: {
			isLoaded: true,
			uid: '12345',
		},
		error: null,
	}

	test('Displays ScoreCard and PlayerListCard if game and player verified', () => {
		const props = {
			...defaultProps,
		}

		const component = shallow(<EndGame {...props} />)

		//Set timeout is used to allow initial functions to finish running and setState to update
		setTimeout(() => {
			expect(component.find(ScoreCard).length).toBe(1)
			expect(component.find(PlayerListCard).length).toBe(1)
		}, 100)
	})

	test('Redirects when game status is in progress', () => {
        const customProps = {
            ...defaultProps,
            game: {
                ...defaultProps.game,
                status: "in progress"
            }
		}

			//Using memory router to allow access to location for test
            const component = mount(
                <MemoryRouter initialEntries={[`/endgame/${gamecode}`]}>
                    <Route render={(props) => <EndGame {...customProps} {...props} />} />
                </MemoryRouter>
            )
    
            setTimeout(() => {
                expect(component.find(EndGame).props().location.pathname).toBe(`/play/${gamecode}`)
            }, 100)

    })

	test('Displays LoadingCard while determining winner', () => {
        const props = {
			...defaultProps,
		}
		const component = shallow(<EndGame {...props} />)
		expect(component.find(LoadingCard).length).toBe(1)
	})



	test('Displays ButtonErrorCard if game is not verified', () => {
        const props = {
			...defaultProps,
			game: {
				...defaultProps.game,
				status: 'new',
			},
		}
		const component = shallow(<EndGame {...props} />)
		
		setTimeout(() => {
			expect(component.find(ButtonErrorCard).length).toBe(1)
		}, 100)
    })

	test('Displays ButtonErrorCard if player is not verified', () => {
        const props = {
			...defaultProps,
			auth: {
				isLoaded: true,
				uid: '54321',
			},
		}
		const component = shallow(<EndGame {...props} />)
		
		setTimeout(() => {
			expect(component.find(ButtonErrorCard).length).toBe(1)
		}, 100)
    })
})
