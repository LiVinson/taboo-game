import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import MainMenu from "./MainMenu"
import { StaticRouter } from "react-router-dom"
//Need static router to prevent react-router errors
it("renders correctly", () => {
  const props = {
    match: {
      path: "/home",
    },
  }

  const MainMenuComponent = renderer
    .create(
      <StaticRouter>
        <MainMenu {...props} />
      </StaticRouter>
    )
    .toJSON()

  expect(MainMenuComponent).toMatchSnapshot()
})
