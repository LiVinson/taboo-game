import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import TimeCard from "../TimeCard"

test("TimeCard renders correctly", () => {
    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <TimeCard />
            </ThemeProvider>
        ).toJSON()
        
    expect(wrapper).toMatchSnapshot()
})