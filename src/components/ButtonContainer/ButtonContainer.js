import React from "react"
import PropTypes from "prop-types"
import { Button, PrimaryButton } from "components/Button"
import "./ButtonContainer.scss"
//Appears at bottom of Taboo Card when a buttons prop is passed to taboo.
// Receives array of objects with button text and click handler
export default function ButtonContainer({ buttons }) {
  return (
    <div className="btnContainer">
      {buttons.map((buttonInfo, index, buttons) => {
        if (index === 0 && buttons.length === 2) {
          return <Button key={index} {...buttonInfo} />
        } else if (index !== 0 && buttons.length === 2) {
          return <PrimaryButton key={index} {...buttonInfo} />
        } else {
          //large button
        }
      })}
    </div>
  )
}

ButtonContainer.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      handleClick: PropTypes.func.IsRequired,
      type: PropTypes.string,
    })
  ),
}
