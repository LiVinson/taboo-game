import React from "react"
// import TabooCardButton from "../TabooCardButton"

export default function ButtonGroup({ buttonInfo=false }) {

    if (!buttonInfo) {
        return null
    }
    
    const { handleClick:leftHandleClick, text:leftText} = buttonInfo.left
    const { handleClick:rightHandleClick, text:rightText} = buttonInfo.right

    return (
        <div>
            <button onClick={leftHandleClick}>{leftText}</button>
            <button onClick={rightHandleClick}>{rightText}</button>            
        </div>
    )
}