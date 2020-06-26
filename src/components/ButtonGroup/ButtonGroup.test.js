import React from "react"
import {mount} from "enzyme"
import renderer from "react-test-renderer"

import ButtonGroup from "./ButtonGroup"

it("renders correctly", () => {
    const props = {
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
    }
    const ButtonGroupComponent = renderer.create(<ButtonGroup {...props}/>).toJSON();
 
    expect(ButtonGroupComponent).toMatchSnapshot()
})

it("receives a buttons array prop", () => {
    const props = {
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
    }
    const ButtonGroupComponent = mount(<ButtonGroup {...props}/>)

    expect(ButtonGroupComponent.prop("buttons")).toHaveLength(2)
})