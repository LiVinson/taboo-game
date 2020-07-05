import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import CreateGameForm from "components/CreateGameForm"

test("CreateGameForm renders correctly", () => {
  const props = {
    handleSubmit: jest.fn(),
    initialValues: {
      name: "",
      gameMode: "remote",
      endGameMethod: "turns",
      turnsValue: 2,
      timeValue: 60,
      skipPenalty: "none",
    },
  }

  const wrapper = renderer.create(
    <ThemeProvider theme={theme}>
      <CreateGameForm {...props} />
    </ThemeProvider>
  )
  expect(wrapper).toMatchSnapshot()
})

/*
Integration testing with Create Game:

- Test that name validation occurs after focusing on input and then leaving
- Test that if turns per person is selected, the corresponding select is enabled and the other select is disabled

*/
