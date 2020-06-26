import React from "react"

export default function ButtonGroup({ buttons }) {       
    const { handleClick:leftHandleClick, text:leftText} = buttons[0]
    const { handleClick:rightHandleClick, text:rightText} = buttons[1]

    return (
        <div>
            <button onClick={leftHandleClick}>{leftText}</button>
            <button onClick={rightHandleClick}>{rightText}</button>            
        </div>
    )
}