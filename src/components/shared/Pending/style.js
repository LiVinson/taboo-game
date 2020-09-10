import styled from "styled-components"


export const StyledPending = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  color: ${(props) => props.theme.color.primary}
  `

export const StyledLargePending = styled.p`
padding: 3.5rem .5rem;
font-size: 3.5rem;
color: ${(props) => props.theme.color.grayDark2}
`