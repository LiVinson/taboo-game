import React from "react"
import { StyledButton, StyledPrimaryButton} from "./style"

//Takes in object of properties passed down. Typically includes type, onClick, text, and any other required attributes
export const Button = (props) => {
  return <StyledButton {...props}>{props.text}</StyledButton>
}


export const PrimaryButton = (props) => {
  return <StyledPrimaryButton {...props}>{props.text}</StyledPrimaryButton>
}