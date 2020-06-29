import React from "react"
import "./Button.scss"


const Button = ({text, handleClick, type}) => {


  return <button className={`button ${type ? "button--"+type: ""}`} onClick={handleClick}>{text}</button>
}
export default Button
