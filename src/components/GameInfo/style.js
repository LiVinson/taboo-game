import styled from "styled-components"

export const StyledGameInfo = styled.div`
   display: flex;
   flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;

  & > * {
    margin-bottom:1.5rem;
    display: ${props => props.open && "block"};
  }
`

StyledGameInfo.displayName = "StyledGameInfo"
