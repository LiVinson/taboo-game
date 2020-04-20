import React from "react"

// export default function Modal({ display, toggleDisplay, header, children }) {
export default function Modal(props) {
  console.log(props)
  const style = {
    zIndex: "10",
    position: "fixed",
    width: "200px",
    left: "50%",
    top: "30%",
    marginLeft: "-100px",
    display: !props.display && "none",
    padding: "30px",
    background: "blue",
  }
  return (
    <div style={style}>
      <h3>{props.header}</h3>
      <div>{props.children}</div>
      <button
        onClick={() => {
          props.toggleDisplay()
        }}
      >
        Close
      </button>
    </div>
  )
}
