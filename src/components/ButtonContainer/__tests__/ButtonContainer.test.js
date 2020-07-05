import React from "react"
import { mount } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import ButtonContainer from "../index"
test("Button Container renders correctly", () => {
  const props = {
    buttons: [
      { text: "Back", onClick: jest.fn() },
      { text: "Next", onClick: jest.fn() },
    ],
  }
  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ButtonContainer {...props} />
      </ThemeProvider>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})

test("Button Container renders Button and PrimaryButton", () => {
  const props = {
    buttons: [
      { text: "Back", onClick: jest.fn() },
      { text: "Next", onClick: jest.fn() },
    ],
  }
  const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ButtonContainer {...props} />
      </ThemeProvider>
    )

  const button1 = wrapper.find("button").first()
  const button2 = wrapper.find("button").last()
  expect(button1).toHaveStyleRule("background-color", theme.color.offWhite)
  expect(button2).not.toHaveStyleRule("background-color", theme.color.offWhite)
})
