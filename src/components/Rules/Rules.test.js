import React from "react"
import Rules from "./Rules"
import renderer from "react-test-renderer"
import { mount } from "enzyme"


it("renders correctly", ()=> {
    const props = {
        match: {
            params: {
                topic: 0
            }
        },
        history: {
            push: jest.fn()
        }
    }

    const RulesComponent = renderer.create(<Rules {...props} />).toJSON()
    expect(RulesComponent).toMatchSnapshot()
})

it("navigates to previous rule if 'back' is selected and first rule is not displayed", ()=> {
    const props = {
        match: {
            params: {
                topic: 2
            }
        },
        history: {
            push: jest.fn()
        }
    }

    const RulesComponent = mount(<Rules {...props} />)
    RulesComponent.find("button").at(0).simulate("click")
    //Check that the history method was called

    expect(props.history.push.mock.calls[0].length).toBe(1)
        //Check the argument the push method was called with (equals the new url)
    expect(props.history.push.mock.calls[0][0]).toBe("/home/rules/1")
})

it("navigates to homepage if 'back' is selected and first rule is already displayed", ()=> {   
    const props = {
        match: {
            params: {
                topic: 0
            }
        },
        history: {
            push: jest.fn()
        }
    }
    const RulesComponent = mount(<Rules {...props} />)
    RulesComponent.find("button").at(0).simulate("click")

    //Check that the history method was called
    expect(props.history.push.mock.calls[0].length).toBe(1)
    //Check the argument the push method was called with (equals the new url)
    expect(props.history.push.mock.calls[0][0]).toBe("/home")
})

it("navigates to next rule if 'next' is selected and last rule is not displayed", ()=> {   
    const props = {
        match: {
            params: {
                topic: 1
            }
        },
        history: {
            push: jest.fn()
        }
    }
    const RulesComponent = mount(<Rules {...props} />)
    RulesComponent.find("button").at(1).simulate("click")
    //Check that the history method was called

    expect(props.history.push.mock.calls[0].length).toBe(1)
    //Check the argument the function was called with
    expect(props.history.push.mock.calls[0][0]).toBe("/home/rules/2")
})

it("navigates to home if 'next' is selected and last rule is already displayed", ()=> {   
    const props = {
        match: {
            params: {
                topic: 3 
            }
        },
        history: {
            push: jest.fn()
        }
    }
    const RulesComponent = mount(<Rules {...props} />)
    RulesComponent.find("button").at(1).simulate("click")
    //Check that the history method was called

    expect(props.history.push.mock.calls[0].length).toBe(1)
    //Check the argument the function was called with
    expect(props.history.push.mock.calls[0][0]).toBe("/home")
})