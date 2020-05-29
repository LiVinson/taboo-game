import React from "react"
import { NavLink } from "react-router-dom"
import "./TabooCardButton.scss"


export default function TabooCardButton({btnType, text, handleClick, btnName}) {

    return (    
        <button onClick={() => handleClick(btnName)}className={`taboo-card-btn ${btnType}`}>
            {text}
        </button>
    )
}