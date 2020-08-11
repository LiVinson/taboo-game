import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PlayerListCard from "../PlayerListCard"
import TeamList from "components/TeamList"

test("renders correctly", () => {
    const props = {
        players: [
			{ name: 'Alexa', team: null },
			{ name: 'Stephen', team: 'team1' },
			{ name: 'Yumani', team: 'team2' },
			{ name: 'Faith', team: 'team1' },
			{ name: 'Lisa', team: 'team2' },
			{ name: 'Danielle', team: 'team2' },
		],
        currentPlayer: "Lisa",
        tabooWord: "Players"
    }

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <PlayerListCard {...props}/>
        </ThemeProvider>
        ).toJSON()

    expect(wrapper).toMatchSnapshot()
})

test("renders TeamList for team1, team2, and unassigned platersplayers", () => {
    const props = {
        players: [
			{ name: 'Alexa', team: 'team1' },
			{ name: 'Stephen', team: 'team1' },
			{ name: 'Yumani', team: 'team2' },
			{ name: 'Faith', team: 'team1' },
			{ name: 'Lisa', team: 'team2' },
			{ name: 'Danielle', team: 'unassigned' },
		],
        currentPlayer: "Lisa",
        tabooWord: "Players"
    }

    const wrapper = mount(
        <ThemeProvider theme={theme}>
            <PlayerListCard {...props}/>
        </ThemeProvider>
    )

    expect(wrapper.find(TeamList)).toHaveLength(3)
})