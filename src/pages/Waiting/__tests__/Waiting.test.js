import React from "react"
import Waiting from "../Waiting"
import { shallow } from "enzyme"

test("Waiting renders without crashing", ()=> {
    const props = {
        match: {
            params: {
                gamecode: "90210",
                playerId: "12345"
            }
        }
    }
    shallow(<Waiting {...props} />)
})