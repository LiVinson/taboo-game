import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from "enzyme"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import GameInfo from '../GameInfo'
import Rules from 'components/Rules'
import PlayerListCard from 'components/PlayerListCard'

test('renders correctly', () => {
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<GameInfo />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test("contains 2 buttons when showRules and showTeams state are false", () => {
    const wrapper = mount(
        <ThemeProvider theme={theme}>
            <GameInfo />
        </ThemeProvider>
    )

    expect(wrapper.find("button")).toHaveLength(2)
    expect(wrapper.find("button").at(0).text()).toEqual("Show Rules")
    expect(wrapper.find("button").at(1).text()).toEqual("Show Teams")
    expect(wrapper.find(Rules)).toHaveLength(0)
    expect(wrapper.find(PlayerListCard)).toHaveLength(0)
})

test("Rules and Team Card displays when Show buttons clicked", () => {
    const wrapper = mount(
        <ThemeProvider theme={theme}>
            <GameInfo />
        </ThemeProvider>
    )

    //Click each button
    wrapper.find("button").at(0).simulate("click")    
    wrapper.find("button").at(1).simulate("click")
    expect(wrapper.find(GameInfo).state("showRules")).toBe(true)
    expect(wrapper.find(GameInfo).state("showTeams")).toBe(true)
    expect(wrapper.find(Rules)).toHaveLength(1)
    expect(wrapper.find(PlayerListCard)).toHaveLength(1)
})
