import React from "react"
import Waiting from "../Waiting"
import { shallow } from "enzyme"

test("Waiting renders without crashing", ()=> {
    const props = {
        match: {
            params: "/waiting/90210/12345"
        }
    }
    shallow(<Waiting {...props} />)
})