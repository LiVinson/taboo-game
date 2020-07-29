
import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledTextLink = styled(Link)`

    transition: all .2s ease-in;
  &:link,
  &:visited {
    color: currentColor;
    text-decoration: none;
    transform: translateY(0)

  }

  &:focus {
    text-shadow: 0px 0.2rem 0.3rem rgba(0, 0, 0, 0.7);
    transform: translateY(-3px);
  }

  &:hover {
    filter: brightness(1.2);
  }
`

StyledTextLink.displayName="StyledTextLink";

