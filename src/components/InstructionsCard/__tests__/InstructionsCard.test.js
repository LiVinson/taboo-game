import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import {InstructionsCard} from "../InstructionsCard"

test("InstructionsCard renders correctly", () => {
    const text = "Here are some instructions to display."
    const wrapper = renderer
    .create(
        <ThemeProvider theme={theme}>
            <InstructionsCard theme={theme}>
                {text}
            </InstructionsCard>
        </ThemeProvider>
    )
    .toJSON()

expect(wrapper).toMatchSnapshot()
})

test("InstructionsCard renders text passed as children", () => {
    const text = "Here are some instructions to display."
    const wrapper = shallow(
            <InstructionsCard theme={theme}>
                {text}
            </InstructionsCard>
    )
 
    expect(wrapper.text()).toEqual(text)      
})