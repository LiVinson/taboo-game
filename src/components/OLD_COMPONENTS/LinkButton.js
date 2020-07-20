import React from "react"
import { withRouter } from "react-router-dom"

function LinkButton(props) {
  const {
    match,
    location,
    history,
    staticContext,
    onClick,
    to,
    ...rest
  } = props
  return (
    <button
      {...rest}
      onClick={(e) => {
        console.log(to)
        onClick && onClick(e)
        history.push(to)
      }}
    />
  )
}

export default withRouter(LinkButton)
