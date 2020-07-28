// import React from "react"
import { Form } from "formik"
import styled, { attrs } from "styled-components"

//General Form Sections
export const StyledForm = styled(Form)`
  text-align: left;
  font-size: ${(props) => props.theme.fontSize.small};
  font-family: var(--font-family--display);
  color: ${(props) => props.theme.color.grayDark2};
`

StyledForm.displayName = "StyledForm"

export const StyledFormSection = styled.div`
  margin-bottom: 1.5rem;
  padding-left: ${(props) => (props.padding ? props.padding : 0)};
  padding-right: ${(props) => (props.padding ? props.padding : 0)};
`
StyledFormSection.displayName = "StyledFormSection"

export const StyledFormSectionTitle = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;

  /* Faint gray line after section title*/
  &::after {
    display: block;
    content: "";
    width: 80%;
    height: 1.5px;
    background-color: ${(props) => props.theme.color.lightGray2};
    margin: 0.8rem auto 1rem auto;
  }
`
StyledFormSectionTitle.displayName = "StyledFormSectionTitle"

/*Used to make set up label and input take up entire width*/
export const StyledInputGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
StyledInputGroup.displayName = "StyledInputGroup"

//Form Inputs
export const StyledTextInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: ${(props) => props.theme.color.lightGray2};
  font-size: 2.2rem;
  border-radius: 2%;
  text-align: center;
  text-transform:uppercase;
  &::placeholder {
    font-size: 1.8rem;
    font-style: italic;
  }

  &:focus {
    outline: none;
    border: solid 1px ${(props) => props.theme.color.primary};
  }
`
StyledTextInput.displayName = "StyledTextInput"

export const StyledRadioButton = styled.input.attrs((props) => ({
  type: "radio",
}))`
  margin-right: 1rem;
`
StyledRadioButton.displayName = "StyledRadioButton"

export const StyledDropDown = styled.select`
  padding: 1rem;
  width: 100%;
  margin: .8rem 0rem 1rem 0;
  background-color: ${(props) => props.theme.color.lightGray2};
  font-size:1.5rem;
  border:none;
  &:focus {
    outline:none;
    border: solid 1px ${(props) => props.theme.color.primary};
  }

`
StyledDropDown.displayName = "StyledDropDown"

export const StyledLabel = styled.label`
  font-size: 1.6rem;
  display: inline-block;
`
StyledLabel.displayName = "StyledLabel"

/* Extends label: keeps original styles + below */
export const StyledTextLabel = styled(StyledLabel)`
  font-size: 1.8;
  width: 100%;
  margin-bottom: 0.8rem;
  text-align: center;
  font-weight: 500;
`
StyledTextLabel.displayName = "StyledTextLabel"

export const StyledErrorText = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.accent2};
`

StyledErrorText.displayName = "StyledErrorText"
