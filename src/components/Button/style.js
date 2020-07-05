import styled from "styled-components"

/*
  4 types of buttons:

  button
  button primary (extension of button)
  button-lg (extension of button)
  button primary lg (extension of button lg)
*/

export const StyledButton = styled.button`
    border:none;
    color: ${props => props.theme.color.secondary};
    background-color: ${props => props.theme.color.offWhite};
    width:47%;
    padding: .6rem 0rem;
    border-radius:2px;
    font-size:2.3rem;
    font-family: var(--font-family--display);
    text-transform: uppercase;

    
    &:active {
        outline:none;
        filter:brightness(.8);
        transform: translateY(2px);
    }
`
export const StyledPrimaryButton = styled(StyledButton)`
 color: ${props => props.theme.color.offWhite};
    background-color: ${props => props.theme.color.secondary};
    width:47%;
    filter:brightness(1.2);
`

// export const StyledLgButton = styled(StyledButton)`

// `

// export const StyledLgPrimaryButton = styled(styledLgButton)`

// `
