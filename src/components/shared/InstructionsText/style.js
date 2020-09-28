import styled from "styled-components"

export const StyledInstructionsText = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
  text-align:${props => props.align ? props.align : "left"};
  color: ${props => props.theme.color.grayDark2};
  &:not(:last-child){
        margin-bottom:1rem;
    }
`

