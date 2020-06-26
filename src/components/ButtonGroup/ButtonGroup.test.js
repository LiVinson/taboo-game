import React from "react"
import {shallow, mount} from "enzyme"
import ButtonGroup from "./ButtonGroup"

it("receives a buttons array prop", () => {
    const props = {
        buttons: [{text: "Back", handleClick: jest.fn()}, {text: "Next", handleClick: jest.fn()}]
 
    }
    const ButtonGroupComponent = mount(<ButtonGroup {...props}/>)

    expect(ButtonGroupComponent.prop("buttons")).toHaveLength(2)
})