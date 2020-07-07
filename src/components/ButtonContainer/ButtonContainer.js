import React from "react"
import PropTypes from "prop-types"
import { Button, PrimaryButton, LargeButton } from "components/shared/Button"
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

/*3 possible buttons: regular, primary, and large regular
  When there are 2 or more buttons, first is always button and second is primary button.
  If there are less than 2 buttons or more than 2 (e.g. 1 or 3 buttons) then that button is large button
  Margin is only added to large button when there are multiple buttons to separate it from buttons above
*/
const determineButtonType = (buttonInfo, index, length) => {
  if (index === 0 && length >= 2) {
    return <Button key={index} {...buttonInfo} />
  } else if (index === 1 && length >= 2) {
    return <PrimaryButton key={index} {...buttonInfo} />
  } else {
    return <LargeButton margin={length>2} key={index} {...buttonInfo} />
  }
}

export default ButtonContainer