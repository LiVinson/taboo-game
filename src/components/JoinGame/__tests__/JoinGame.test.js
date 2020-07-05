import React from "react"
import JoinGame from "../JoinGame"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"

test("JoinGame renders without crashing", () => {
  shallow(<JoinGame />)
})

test("JoinGame contains a form element and 2 buttons", () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <JoinGame />
    </ThemeProvider>
  )
  expect(wrapper.find("form").length).toBe(1)
  expect(wrapper.find("button").length).toBe(2)
})

test("JoinGame has correct default values for state", () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <JoinGame />
    </ThemeProvider>
  )
  expect(wrapper.find(JoinGame)).toHaveLength(1)
  expect(wrapper.find(JoinGame).state("name")).toBe("")
  expect(wrapper.find(JoinGame).state("gamecode")).toBe("")
})


test("Join Game navigates back to /home when back is selected", () => {
    const props = {
      history: {
        push: jest.fn(),
      },
    }
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <JoinGame {...props} />
      </ThemeProvider>
    )
    wrapper.find("button").at(0).simulate("click")
    expect(props.history.push.mock.calls[0].length).toBe(1)
    //Check the argument the push method was called with (equals the new url)
    expect(props.history.push.mock.calls[0][0]).toBe("/home")
  })