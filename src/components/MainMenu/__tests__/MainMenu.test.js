import React from "react"
import renderer from "react-test-renderer"
import MainMenu from "../MainMenu"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"

//Need static router to prevent react-router errors
it("renders correctly", () => {
  const props = {
    match: {
      path: "/home",
    },
  }

  const MainMenuComponent = renderer
    .create(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <MainMenu {...props} />
        </MemoryRouter>
      </ThemeProvider>
    )
    .toJSON()

  expect(MainMenuComponent).toMatchSnapshot()
})
