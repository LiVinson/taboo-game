import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import Wrapper from "./Wrapper"

it("renders correctly", ()=> {
    const children = <h1>I am a child element</h1>
    const WrapperComponent = renderer.create(<Wrapper>{children}</Wrapper>).toJSON()
    expect(WrapperComponent).toMatchSnapshot()
})

it("renders props.children", ()=> {
    const children = <h1>I am a child element</h1>
    const WrapperComponent = shallow(<Wrapper>{children}</Wrapper>)
    expect(WrapperComponent.contains(children)).toBe(true)
})