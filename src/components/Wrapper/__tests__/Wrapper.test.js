import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import Wrapper from "../Wrapper"

test("Wrapper renders correctly", () => {
  const children = <h1>I am a child element</h1>

  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Wrapper>
          {children}
        </Wrapper>
      </ThemeProvider>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})

test("Wrapper renders props.children", () => {
  const children = <h1>I am a child element</h1>
  const WrapperComponent = shallow(<Wrapper theme={theme}>{children}</Wrapper>)
  expect(WrapperComponent.contains(children)).toBe(true)
})
