import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import ScoreCard from "../ScoreCard"

test("ScoreCard renders correctly", () => {
    const props = {
        teamScores: [12, 10]
    }

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <ScoreCard {...props} />
        </ThemeProvider>
    ).toJSON()

    expect(wrapper).toMatchSnapshot()
})