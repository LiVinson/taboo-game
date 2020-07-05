import React from "react"
import {
  StyledForm,
  StyledFormSection,
  StyledFormSectionTitle,
  StyledInputGroup,
  StyledTextInput,
  StyledRadioButton,
  StyledDropDown,
  StyledLabel,
  StyledTextLabel,
  StyledErrorText
} from "./style.js"

export const Form = (props) => {
  return <StyledForm {...props}>{props.children}</StyledForm>
}

export const FormSection = (props) => {
  return <StyledFormSection {...props}>{props.children}</StyledFormSection>
}

export const FormSectionTitle = (props) => {
  return (
    <StyledFormSectionTitle {...props}>{props.children}</StyledFormSectionTitle>
  )
}

export const InputGroup = (props) => {
  return <StyledInputGroup>{props.children}</StyledInputGroup>
}

export const TextInput = (props) => {
    return (
        <StyledTextInput {...props} />
    )
}

export const RadioButton = (props) => {
    return (
        <StyledRadioButton {...props}/>
    )
}

export const DropDown = (props) => {
    return (
        <StyledDropDown {...props}>
            {props.children}
        </StyledDropDown>
    )
}

export const Label = (props) => <StyledLabel {...props}/>

export const TextLabel = (props) => <StyledTextLabel {...props} />

export const ErrorText = (props) => <StyledErrorText{...props} />