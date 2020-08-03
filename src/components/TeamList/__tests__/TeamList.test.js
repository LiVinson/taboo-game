import React from "react"
import renderer from "react-test-renderer"
import { mount } from "enzyme"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import TeamList from "../TeamList"
import {Player} from "../style"


test("renders correctly", () => {
    const props = {
        title: "Team 1",
        players: [
            { id: 12345, name: "Alexa", team: "team1" },
            { id: 12346, name: "Stephen", team: "team1" },
            { id: 12348, name: "Faith", team: "team1" },
          ],
        currentPlayer: "12349"
    }
    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <TeamList {...props}/>
        </ThemeProvider>
        ).toJSON()

        expect(wrapper).toMatchSnapshot()
})

test("renders a Player component for each player", () => {
    const props = {
        title: "Team 1",
        players: [
            { id: 12345, name: "Alexa", team: "team1" },
            { id: 12346, name: "Stephen", team: "team1" },
            { id: 12348, name: "Faith", team: "team1" },
          ],
        currentPlayer: "12349"
    }
    const wrapper = mount(
        <ThemeProvider theme={theme}>
            <TeamList {...props}/>
        </ThemeProvider>
    )

        expect(wrapper.find(Player)).toHaveLength(props.players.length)
})
