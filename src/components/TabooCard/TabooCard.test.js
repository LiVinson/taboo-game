import React from "react"
import TabooCard from "./TabooCard"
import ButtonGroup from "../ButtonGroup"
import { shallow, mount } from "enzyme"

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

  it("renders ButtonGroup if button prop is provided", () => {
    const props = {
        type: "home",
        tabooWord: "taboo",
        list: ["word1", "word2", "word3"],
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
      }
      const TabooCardComponent = mount(<TabooCard {...props}/>)
      expect(TabooCardComponent.find(ButtonGroup)).toHaveLength(1)
  })


