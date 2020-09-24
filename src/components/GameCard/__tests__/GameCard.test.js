import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from '../GameCard'

describe('GameCard functionality and rendering', () => {
	const defaultProps = {
		currentCard: {
			word: 'Will Smith',
			tabooList: ['Fresh Prince', 'Philadelphia', 'Jazzy Jeff', 'Independence Day', 'Jada Pinkett'],
		},
		changeCardStatus: jest.fn(),
		isPending: false,
		error: null
	}

	test('GiverGameCard renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<GiverGameCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test("Selecting 'Skip' calls props.changeCardStatus with correct status", () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<GiverGameCard {...props} />
			</ThemeProvider>
		)	

		 wrapper.find("button").at(0).simulate("click")
		 expect(props.changeCardStatus).toHaveBeenCalledWith("skipped")    
		
	})

	test("Selecting 'Next' calls props.changeCardStatus with correct status", () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<GiverGameCard {...props} />
			</ThemeProvider>
		)

		 wrapper.find("button").at(1).simulate("click")
		 expect(props.changeCardStatus).toHaveBeenCalledWith("correct")    
		
	})

	test('WatcherGameCard renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<WatcherGameCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test("Selecting 'Buzzer' calls props.changeCardStatus with correct status", () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<WatcherGameCard {...props} />
			</ThemeProvider>
		)

		 wrapper.find("button").at(0).simulate("click")
		 expect(props.changeCardStatus).toHaveBeenCalledWith("discard")    
		
	})



	test('TeamGameCard renders correctly for watcherTeam', () => {
		const props = {
			role: 'watcherTeam',
			giver: {
				name: 'Joe',
			},
			watcher: {
				name: 'Sam',
			},
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<TeamGameCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	
	test('TeamGameCard renders correctly for giverTeam', () => {
		const props = {
			role: 'giverTeam',
			giver: {
				name: 'Joe',
			},
			watcher: {
				name: 'Sam',
			},
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<TeamGameCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})
})
