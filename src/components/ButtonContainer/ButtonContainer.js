import React from "react"
import PropTypes from "prop-types"
import { Button, PrimaryButton } from "components/shared/Button"
import { StyledButtonContainer } from "./style"

//Appears at bottom of Taboo Card when a buttons prop is passed to taboo.
// Receives array of objects with button text and click handler



const ButtonContainer = ({ buttons }) => {
  return (
    <StyledButtonContainer>
      {buttons.map((buttonInfo, index, buttons) =>
        determineButtonType(buttonInfo, index, buttons.length)
      )}
    </StyledButtonContainer>
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

const determineButtonType = (buttonInfo, index, length) => {
  if (index === 0 && length === 2) {
    return <Button key={index} {...buttonInfo} />
  } else if (index !== 0 && length === 2) {
    return <PrimaryButton key={index} {...buttonInfo} />
  } else {
    //large button
  }
}

export default ButtonContainer