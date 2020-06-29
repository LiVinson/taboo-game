import React from "react"
import PropTypes from "prop-types"
import Button from "components/Button"
import "./ButtonContainer.scss"
//Appears at bottom of Taboo Card when a buttons prop is passed to taboo.
// Receives array of objects with button text and click handler
export default function ButtonContainer({ buttons }) {
  
  return (
    <div className="btnContainer">
      {buttons.map((buttonInfo, index) => {
        const { text, handleClick, type } = buttonInfo
        return <Button key={index} text={text} handleClick={handleClick} type={type ? type : null}/> })
      }

    </div>
  )
}

ButtonContainer.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      handleClick: PropTypes.func.IsRequired,
      type: PropTypes.string
    })
  ),
}
