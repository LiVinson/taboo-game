import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RoundInstructionsCard from "../RoundInstructionsCard"

test("RoundInstructionsCard renders correctly", ()=> {
    const props = {
        role: "giver",
        giver: "Sam",
        watcher: "Jo",
        startRound: jest.fn
    }

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <RoundInstructionsCard {...props} />
        </ThemeProvider>
    ).toJSON()

    expect(wrapper).toMatchSnapshot()
})