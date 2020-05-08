import React from "react"

const style = {
  maxWidth: "1024px",
  height: "95vh",
  padding: "0px 20px",
  margin: "0 auto",
  position: "relative",
}
export default function Container({ children }) {
  return (
    <div className="container" style={style}>
      {children}
    </div>
  )
}
