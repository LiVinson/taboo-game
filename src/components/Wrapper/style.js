import styled, { css } from "styled-components"

export const StyledWrapper = styled.div`

  padding: 1rem 2.5rem 6rem 2.5rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.color.lightGray1};
  z-index:0;
  /* background-image: ${(props) => (css`
    linear-gradient(
      to bottom,
      ${props.theme.color.white} 0%,
      ${props.theme.color.white} 50%, 70%,
      ${props.theme.color.primary} 90%)`
    )}  */
`
