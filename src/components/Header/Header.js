import React from "react"
import PropTypes from "prop-types"
import {  StyledHeader, Title, Subheading, FocusSpan} from "./style.js"


export default function Header({ location }) {
  const homeRoute = location.pathname.includes("home")
  const homeRouteExact = location.pathname === ("/home")

  return (
    <StyledHeader large={homeRoute} subheading={homeRouteExact}>
      <Title large={homeRoute}>Taboo!</Title>
      {homeRouteExact && (
        <Subheading>
          The team game that’s all about what you{" "}
          <FocusSpan>say,</FocusSpan> and what you{" "}
          <FocusSpan>don’t!</FocusSpan>
        </Subheading>
      )}
    </StyledHeader>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}
