import React from "react"
import "./Button.scss"

//Takes in object of properties passed down. Typically includes type, onClick, text, and any other required attributes
const Button = (props) => {
  const btnProperties = {
    ...props,
    className: `button ${props.type ? "button--" + props.type : ""}`,
  }

  return <button {...btnProperties}>{props.text}</button>
}
export default Button
