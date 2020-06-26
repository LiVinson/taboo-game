import React from "react"
import PropTypes from "prop-types"

//Appears at bottom of Taboo Card when a buttons prop is passed to taboo.
// Receives array of objects with button text and click handler
export default function ButtonGroup({ buttons }) {
  const { handleClick: leftHandleClick, text: leftText } = buttons[0]
  const { handleClick: rightHandleClick, text: rightText } = buttons[1]

  return (
    <div>
      <button onClick={leftHandleClick}>{leftText}</button>
      <button onClick={rightHandleClick}>{rightText}</button>
    </div>
  )
}

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      handleClick: PropTypes.func.IsRequired,
    })
  ),
}
