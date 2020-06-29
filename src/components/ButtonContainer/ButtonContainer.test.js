import React from "react"
import {mount} from "enzyme"
import renderer from "react-test-renderer"

import ButtonContainer from "./ButtonContainer"

it("renders correctly", () => {
    const props = {
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
    }
    const ButtonContainerComponent = renderer.create(<ButtonContainer {...props}/>).toJSON();
 
    expect(ButtonContainerComponent).toMatchSnapshot()
})

it("receives a buttons array prop", () => {
    const props = {
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
    }
    const ButtonContainerComponent = mount(<ButtonContainer {...props}/>)

    expect(ButtonContainerComponent.prop("buttons")).toHaveLength(2)
})