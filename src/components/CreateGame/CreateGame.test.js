import React from "react"
import CreateGame from "./CreateGame"
import { shallow, mount} from "enzyme"

it("renders without crashing", () => {
     shallow(<CreateGame />)
})

it("contains a form element and 2 buttons", () => {
    const CreateGameComponent = shallow(<CreateGame />)
    expect(CreateGameComponent.find("form").length).toBe(1);
    expect(CreateGameComponent.find("button").length).toBe(2);

})

it("has correct default values for state", ()=> {   
    
    const CreateGameComponent = mount(<CreateGame />)
    expect(CreateGameComponent.state("name")).toBe("")
    expect(CreateGameComponent.state("gameMode")).toBe("remote")
    expect(CreateGameComponent.state("endGame")).toEqual({type:"time", value: 60})
    expect(CreateGameComponent.state("skipPenalty")).toBe("none")
    
})

it("navigates back to /home when back is selected", ()=> {
    const CreateGameComponent = shallow(<CreateGame />)
    CreateGameComponent.find("button").at(1).simulate("click")
    expect(CreateGameComponent.instance().handlePreviousBtn).toHaveBeenCalledTimes(1)
})
/*
    Contains one form element
    Contains two buttons
    When back is selected: returns to /home
    When Create is selected: it calls a function that retreives form data and stores in an object

*/