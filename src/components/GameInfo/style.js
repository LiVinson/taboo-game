import styled from "styled-components"

export const StyledGameInfo = styled.div`
  /* text-align: center; */
   display: flex;
   flex-wrap: wrap;
   /*flex-direction: column; */ 
  justify-content: space-around;
  /* width: fit-content;  */
  margin: 0 auto;
  /* margin-bottom: 1rem; */



  & > * {
    margin-bottom:1.5rem;
    display: ${props => props.open && "block"};

  }




`

StyledGameInfo.displayName = "StyledGameInfo"
