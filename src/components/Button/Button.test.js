import React from "react"
import Button from "./Button"
import renderer from "react-test-renderer"
import { shallow } from "enzyme"

it("renders correctly", () => {

    const ButtonComponent = renderer.create(<Button/>).toJSON()
    expect(ButtonComponent).toMatchSnapshot()
})

/*
    receives a text prop and a handleClick property
*/
it("displays text received as prop", () => {
    const props = {
        text: "A button",
        handleClick: jest.fn()
    }
    const ButtonComponent = shallow(<Button {...props} />)
    expect(ButtonComponent.find("button").text()).toEqual("A button")
})


it("calls handleClick prop on click of button", () => {
    const props = {
        text: "A button",
        handleClick: jest.fn()
    }
    const ButtonComponent = shallow(<Button {...props} />)
    ButtonComponent.find("button").simulate("click")
    expect(props.handleClick.mock.calls.length).toBe(1)
})