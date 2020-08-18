import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RoundInstructionsCard from "../RoundInstructionsCard"

test("RoundInstructionsCard renders correctly", ()=> {
	const props = {
		role: 'watcherTeam', 
        giver: { name: 'Sam', playerId: '12345', team: 'team 1' },
		watcher: { name: 'Jo', playerId: '23456', team: 'team 2' },
		startRound: jest.fn(),
	}

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <RoundInstructionsCard {...props} />
        </ThemeProvider>
    ).toJSON()

    expect(wrapper).toMatchSnapshot()
})