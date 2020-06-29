import React from "react"
import TabooCard from "./TabooCard"
import ButtonContainer from "components/ButtonContainer"
import { shallow, mount } from "enzyme"
import renderer from "react-test-renderer"

it("renders correctly", ()=> {
  const props = {
    type: "home",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],

  }
  const TabooCardComponent = renderer.create(<TabooCard {...props} />).toJSON()

  expect(TabooCardComponent).toMatchSnapshot()
})

it("renders div with 'type' class of prop provided ", () => {
  const props = {
    type: "home",
    tabooWord: "taboo",
    list: ["word1", "word2", "word3"],

  }
  const TabooCardComponent = shallow(<TabooCard {...props} />)
  expect(TabooCardComponent.hasClass("taboo-card--home"))
})

it("Renders children prop if it is provided", () => {
  const props = {
    type: "home",
    tabooWord: "taboo",

  }

  const TabooCardComponent = shallow(
    <TabooCard {...props}>
      <h1>I am a child property</h1>
    </TabooCard>
  )
  expect(TabooCardComponent.contains(<h1>I am a child property</h1>)).toEqual(true)
})

it("Renders list prop if children prop is not passed", () => {
    const props = {
      type: "home",
      tabooWord: "taboo",
      list: ["word1", "word2", "word3"],
 
    }
  
    const TabooCardComponent = mount(<TabooCard {...props} />)
    expect(TabooCardComponent.prop("children")).toEqual(undefined)
    
    expect(TabooCardComponent.find("ul.taboo-card__list").children()).toHaveLength(props.list.length)

  })

  it("renders ButtonContainer if button prop is provided", () => {
    const props = {
        type: "home",
        tabooWord: "taboo",
        list: ["word1", "word2", "word3"],
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
      }
      const TabooCardComponent = mount(<TabooCard {...props}/>)
      expect(TabooCardComponent.find(ButtonContainer)).toHaveLength(1)
  })


