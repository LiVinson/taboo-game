import React from "react"
import { MemoryRouter } from "react-router-dom"
import renderer from "react-test-renderer"
import "jest-styled-components"
import TextLink from "../index"

test("TextLink renders correctly", () => {
  const props = {
    to: "/home",
    text: "I'm a Link",
  }
  //Memory Router used so <Link> can be rendered in tests
  const wrapper = renderer
    .create(
      <MemoryRouter>
        <TextLink {...props} />
      </MemoryRouter>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})
