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

test("Renders Button and PrimaryButton when info for 2 buttons provided", () => {
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

test("Renders Button, PrimaryButton, and LargeBytton when info for 3 buttons provided", () => {
  const props = {
    buttons: [
      { text: "Team 1", onClick: jest.fn() },
      { text: "Team 2", onClick: jest.fn() },
      { text: "Play!", onClick: jest.fn() }
    ],
  }
  const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ButtonContainer {...props} />
      </ThemeProvider>
    )

  const button1 = wrapper.find("button").at(0)
  const button2 = wrapper.find("button").at(1)
  const button3 = wrapper.find("button").at(2)
  expect(button1).toHaveStyleRule("background-color", theme.color.offWhite)
  expect(button2).not.toHaveStyleRule("background-color", theme.color.offWhite)
  expect(button3).toHaveStyleRule("width", "100%")

})
