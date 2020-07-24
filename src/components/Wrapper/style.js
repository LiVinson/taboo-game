import styled, { css } from "styled-components"

export const StyledWrapper = styled.div`

  padding: 1rem .5rem 6rem .5rem;
  min-height: 100vh;
  position: relative;
  /* background-color: ${props => props.theme.color.offWhite}; */
  z-index:0;
  width: 30rem;
  max-width:100%;
  margin: 0 auto;
  /* background-image: ${(props) => (css`
    linear-gradient(
      to bottom,
      ${props.theme.color.white} 0%,
      ${props.theme.color.white} 50%, 70%,
      ${props.theme.color.primary} 90%)`
    )}  */
`
