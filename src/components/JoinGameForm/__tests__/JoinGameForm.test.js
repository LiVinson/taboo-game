import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import JoinGameForm from "components/JoinGameForm"

test("JoinGameForm renders correctly", () => {
  const props = {
    handleSubmit: jest.fn(),
    initialValues: {
      name: "",
      gamecode: "remote",
    },
  }

  const wrapper = renderer.create(
    <ThemeProvider theme={theme}>
      <JoinGameForm {...props} />
    </ThemeProvider>
  )
  expect(wrapper).toMatchSnapshot()
})
