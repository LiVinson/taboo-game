import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import { Button, PrimaryButton } from ".."

test("Button renders correctly", () => {
  const props = {
    text: "Button",
    onClick: jest.fn()
 
  }
  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button {...props} />
      </ThemeProvider>
    )
    .toJSON()
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toHaveStyleRule("background-color", theme.color.offWhite)


})

test("Primary button renders correctly", () => {
    const props = {
      text: "Button",
      onClick: jest.fn()   
    }

    const wrapper = renderer
      .create(
        <ThemeProvider theme={theme}>
          <PrimaryButton {...props} />
        </ThemeProvider>
      )
      .toJSON()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).not.toHaveStyleRule("background-color", theme.color.offWhite)

  })

/*
    receives a text prop and a handleClick property
*/
test("Button displays text received as prop", () => {
  const props = {
    text: "A button",
    handleClick: jest.fn(),
  }
  const wrapper = mount(<Button {...props} theme={theme} />)
  expect(wrapper.find("button").text()).toEqual("A button")
})

test("Button calls handleClick prop when clicked", () => {
  const props = {
    text: "A button",
    onClick: jest.fn(),
  }
  const wrapper = mount(<Button {...props} theme={theme}/>)
  wrapper.find("button").simulate("click")
  expect(props.onClick.mock.calls.length).toBe(1)
})
