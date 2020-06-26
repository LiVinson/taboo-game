import React from "react"
import renderer from "react-test-renderer"
import LayeredCards from "./LayeredCards"


it("renders correctly", ()=> {
    const LayeredCardsComponent = renderer.create(<LayeredCards />).toJSON()
    expect(LayeredCardsComponent).toMatchSnapshot()
})