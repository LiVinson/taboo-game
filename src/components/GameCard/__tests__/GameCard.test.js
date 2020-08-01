import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from '../index'

test('GiverGameCard renders correctly', () => {
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<GiverGameCard />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('WatcherGameCard renders correctly', () => {
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<WatcherGameCard />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('TeamGameCard renders correctly', () => {
	const props = {
		role: 'watcherTeam',
		giver: {
            name: 'Joe'
        },
		watcher: {
            name: 'Sam'
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

test('TeamGameCard renders correct instructions based on role prop', () => {
	const props = {
		role: 'watcherTeam',
		giver: {
            name: 'Joe'
        },
		watcher: {
            name: 'Sam'
        },
	}
	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<TeamGameCard {...props} />
		</ThemeProvider>
	)

	const div = wrapper.find('div').at(0)

	expect(div.text()).toEqual(
		`Relax!It’s the other team’s turn to give clues and guess! ${props.watcher.name} will be watching to make sure ${props.giver.name} doesn’t say any Taboo words.`
	)
})
