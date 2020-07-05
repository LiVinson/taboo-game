import React from "react"
import renderer from "react-test-renderer"
import LayeredCards from "../LayeredCards"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"

it("Layered cards renders correctly", () => {
  const LayeredCardsComponent = renderer
    .create(
      <ThemeProvider theme={theme}>
        <LayeredCards />
      </ThemeProvider>
    )
    .toJSON()
  expect(LayeredCardsComponent).toMatchSnapshot()
})
