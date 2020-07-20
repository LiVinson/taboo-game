import styled from "styled-components"

/*
  4 types of buttons:

  button
  button primary (extension of button)
  button-lg (extension of button) or button-lg primary (tbd)
  text button

*/

export const StyledButton = styled.button`
  border: none;
  color: ${(props) => props.theme.color.secondary};
  background-color: ${(props) => props.theme.color.offWhite};
  width: 47%;
  padding: 0.6rem 0rem;
  border-radius: 2px;
  font-size: 2.3rem;
  font-family: var(--font-family--display);
  text-transform: uppercase;

  &:active {
    outline: none;
    filter: brightness(0.8);
    transform: translateY(2px);
  }
`
export const StyledPrimaryButton = styled(StyledButton)`
  color: ${(props) => props.theme.color.offWhite};
  background-color: ${(props) => props.theme.color.secondary};
  width: 47%;
  &:active {
    filter: brightness(1.2);
  }
`
export const StyledLargeButton = styled(StyledButton)`
  width: 100%;
  padding: 1rem 0;
  font-size: 3rem;
  flex: 1 0 100%;
  margin-top: ${props => props.margin && "1.2rem"};
  border: solid 3px ${(props) => props.theme.color.secondary};
  background-color: ${(props) => props.theme.color.lightGray2};
  font-weight:600;
`

export const StyledTextButton = styled.button`
  font-size: 2.5rem;
  font-weight:400;
  background-color:inherit;
  color: ${props => props.theme.color.primary};
  border:none;
  padding: .8rem;
  padding-bottom: 0rem;
  font-family: ${props => props.theme.text.display};
  width: fit-content;
  &:nth-child(2){
    margin-bottom: 2rem;
  }
  &::after {
    content:"";
    display:block;
    height: 2px;
    width: 100%;
    background-color:currentColor;
    margin-top: .5rem;
    
  }

  &:active,
  &:focus {
    outline: none;
    color: ${props => props.theme.color.tertiary};

  }
`