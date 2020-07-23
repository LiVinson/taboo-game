import React from "react"
import PropTypes from "prop-types"
import {  StyledHeader, Title, Subheading, FocusSpan} from "./style.js"


export default function Header({ location }) {
  const homeOrEndRoute = location.pathname.includes("home") || location.pathname.includes("end")
  const homeRouteExact = location.pathname === ("/home")

  return (
    <StyledHeader large={homeOrEndRoute} subheading={homeRouteExact}>
      <Title large={homeOrEndRoute}>Taboo!</Title>
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
