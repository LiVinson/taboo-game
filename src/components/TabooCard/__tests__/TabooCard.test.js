import React from "react"
import { shallow, mount } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"
import { ThemeProvider } from "styled-components"
import theme from "../../../global-design/theme"
import TabooCard from "../TabooCard"
import ButtonContainer from "components/ButtonContainer"

test("TabooCard renders correctly when list is passed ", () => {
  const props = {
    type: "home",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],
  }
  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <TabooCard {...props} />
      </ThemeProvider>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
})

test("TabooCard applies style based on type prop provided", () => {
  const props = {
    type: "middle",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],
  }
  const wrapper = renderer
    .create(
      <ThemeProvider theme={theme}>
        <TabooCard {...props} />
      </ThemeProvider>
    )
    .toJSON()

  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toHaveStyleRule("z-index", "10")
})

test("TabooCard renders children prop if it is provided", () => {
  const h1 = <h1>I am a child property</h1>
  const props = {
    type: "home",
    tabooWord: "taboo",
    children: h1,
  }

  const wrapper = shallow(<TabooCard {...props} />)
  expect(wrapper.contains(<h1>I am a child property</h1>)).toEqual(true)
})

test("TabooCard renders list prop if children prop is not passed", () => {
  const props = {
    type: "home",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],
  }

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <TabooCard {...props} />
    </ThemeProvider>
  )
  console.log(wrapper)
  expect(wrapper.find("ul").children()).toHaveLength(props.list.length)
})

test("renders ButtonContainer if button prop is provided", () => {
  const props = {
    type: "home",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],
    buttons: [
      { text: "Back", handleClick: jest.fn() },
      { text: "Next", handleClick: jest.fn() },
    ],
  }
  const wrapper = shallow(<TabooCard {...props} />)
  expect(wrapper.find(ButtonContainer)).toHaveLength(1)
})
