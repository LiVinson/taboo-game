import React from "react"
import Rules from "../Rules"
import renderer from "react-test-renderer"
import { shallow, mount } from "enzyme"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"

test("Rules renders without crashing", () => {
    const props = {
        match: {
          params: {
            topic: 0,
          },
        },
        history: {
          push: jest.fn(),
        },
      }

  shallow(<Rules {...props} />)
})

test("Rules render correctly", () => {
  const props = {
    match: {
      params: {
        topic: 0,
      },
    },
    history: {
      push: jest.fn(),
    },
  }

  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Rules {...props} />
      </ThemeProvider>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})

test("Rules navigates to previous rule if 'back' is selected and first rule is not displayed", () => {
  const props = {
    match: {
      params: {
        topic: 2,
      },
    },
    history: {
      push: jest.fn(),
    },
  }

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Rules {...props} />
    </ThemeProvider>
  )
  wrapper.find("button").at(0).simulate("click")
  //Check that the history method was called

  expect(props.history.push.mock.calls[0].length).toBe(1)
  //Check the argument the push method was called with (equals the new url)
  expect(props.history.push.mock.calls[0][0]).toBe("/home/rules/1")
})

test("Rules navigates to homepage if 'back' is selected and first rule is already displayed", () => {
  const props = {
    match: {
      params: {
        topic: 0,
      },
    },
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Rules {...props} />
    </ThemeProvider>
  )
  wrapper.find("button").at(0).simulate("click")

  //Check that the history method was called
  expect(props.history.push.mock.calls[0].length).toBe(1)
  //Check the argument the push method was called with (equals the new url)
  expect(props.history.push.mock.calls[0][0]).toBe("/home")
})

test("Navigates to next rule if 'next' is selected and last rule is not displayed", () => {
  const props = {
    match: {
      params: {
        topic: 1,
      },
    },
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Rules {...props} />
    </ThemeProvider>
  )
  wrapper.find("button").at(1).simulate("click")
  //Check that the history method was called
  expect(props.history.push.mock.calls[0].length).toBe(1)
  //Check the argument the function was called with
  expect(props.history.push.mock.calls[0][0]).toBe("/home/rules/2")
})

test("Navigates to home if 'next' is selected and last rule is already displayed", () => {
  const props = {
    match: {
      params: {
        topic: 3,
      },
    },
    history: {
      push: jest.fn(),
    },
  }
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Rules {...props} />
    </ThemeProvider>
  )
  wrapper.find("button").at(1).simulate("click")
  //Check that the history method was called

  expect(props.history.push.mock.calls[0].length).toBe(1)
  //Check the argument the function was called with
  expect(props.history.push.mock.calls[0][0]).toBe("/home")
})
