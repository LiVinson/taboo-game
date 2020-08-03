import React from "react"
import CreateGame from "../CreateGame"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"

test("CreateGame renders without crashing", () => {
  const props = {
    history: {
      push: jest.fn(),
    },
  }
  shallow(<CreateGame {...props} />)
})

test("CreateGame contains a form element and 2 buttons", () => {
  const props = {
    history: {
      push: jest.fn(),
    },
  }

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <CreateGame {...props} />
    </ThemeProvider>
  )
  expect(wrapper.find("form").length).toBe(1)
  expect(wrapper.find("button").length).toBe(2)
})

test("CreateGame has correct default values for state", () => {
  const props = {
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <CreateGame {...props}/>
    </ThemeProvider>
  )
  expect(wrapper.find(CreateGame)).toHaveLength(1)
  expect(wrapper.find(CreateGame).state("name")).toBe("")
  expect(wrapper.find(CreateGame).state("endGameMethod")).toBe("turns")
  expect(wrapper.find(CreateGame).state("turnsValue")).toBe(2)
  expect(wrapper.find(CreateGame).state("timeValue")).toBe(60)
  expect(wrapper.find(CreateGame).state("skipPenalty")).toBe("none")
})

test("navigates back to /home when back is selected", () => {
  const props = {
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <CreateGame {...props} />
    </ThemeProvider>
  )
  wrapper.find("button").at(0).simulate("click")
  expect(props.history.push.mock.calls[0].length).toBe(1)
  //Check the argument the push method was called with (equals the new url)
  expect(props.history.push.mock.calls[0][0]).toBe("/home")
})
