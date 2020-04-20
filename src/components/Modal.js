import React from "react"

export default function Modal({ display, toggleDisplay, header, children }) {
  const style = {
    zIndex: "10",
    position: "fixed",
    width: "200px",
    left: "50%",
    top: "30%",
    marginLeft: "-100px",
    display: !display && "none",
    padding: "30px",
    background: "blue",
  }
  return (
    <div style={style}>
      <h3>{header}</h3>
      <div>{children}</div>
      <button onClick={() => toggleDisplay()}>Close</button>
    </div>
  )
}
