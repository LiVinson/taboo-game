import React from "react"
import { StyleHideContainer } from "./style"

//Used to hide features that are not complete yet.
export const HideContainer = ({children}) => {
    return (<StyleHideContainer>{children}</StyleHideContainer>)
}