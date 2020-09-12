import styled from "styled-components"

export const StyledErrorMessage = styled.p`
  font-size: ${props => props.large ? "2.2rem" : "1.5rem"};
  font-style: italic;
  color: red
  `