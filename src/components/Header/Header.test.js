import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../global-design/theme"
import Header from "./Header"
import { Title, Subheading } from "components/Header/style.js"



//-------------- Title --------------------

test("Title renders correctly when large", () => {
  const props = {
    large: true,
  }
  const wrapper = renderer.create(<Title theme={theme} {...props} />).toJSON()
  expect(wrapper).toMatchSnapshot()
})
test("Title renders correctly when small", () => {
  const props = {
    large: false,
  }
  const wrapper = renderer.create(<Title theme={theme} {...props} />).toJSON()
  expect(wrapper).toMatchSnapshot()
})

test("Title renders the larger title when large prop is true", () => {
  const props = {
    large: true,
  }
  const wrapper = shallow(<Title {...props} theme={theme} />)
  expect(wrapper).toHaveStyleRule("font-size", "7rem")
  expect(wrapper).toHaveStyleRule("text-align", "center")
})

test("Title renders the smaller title when large is small", () => {
  const props = {
    large: false,
  }
  const wrapper = shallow(<Title {...props} theme={theme} />)
  expect(wrapper).toHaveStyleRule("font-size", "2.7rem")
})

//-------------- Subheading --------------------
test("Subheading renders correctly", () => {
  const wrapper = renderer.create(<Subheading theme={theme} />).toJSON()
  expect(wrapper).toMatchSnapshot()
})

//--------------Header--------------------
test("Header renders correctly on home route", () => {
  const props = {
    location: {
      pathname: "/home",
    },
  }

  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Header  {...props} />
      </ThemeProvider>
    )
    .toJSON()
  expect(wrapper).toMatchSnapshot()
})

test("Header renders correctly when not on home route", () => {
  const props = {
    location: {
      pathname: "/play",
    },
  }

  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Header  {...props} />
      </ThemeProvider>
    )
    .toJSON()
  expect(wrapper).toMatchSnapshot()
})