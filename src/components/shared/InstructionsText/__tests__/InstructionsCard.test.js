import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import {InstructionsText} from "../InstructionsText"

test("InstructionsText renders correctly", () => {
    const text = "Here are some instructions to display."
    const wrapper = renderer
    .create(
        <ThemeProvider theme={theme}>
            <InstructionsText theme={theme}>
                {text}
            </InstructionsText>
        </ThemeProvider>
    )
    .toJSON()

expect(wrapper).toMatchSnapshot()
})

test("InstructionsText renders text passed as children", () => {
    const text = "Here are some instructions to display."
    const wrapper = shallow(
            <InstructionsText theme={theme}>
                {text}
            </InstructionsText>
    )
 
    expect(wrapper.text()).toEqual(text)      
})