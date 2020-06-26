import React from "react"
import "./Header.scss"


export default function Header({ location }){
  const pathname = location.pathname
  let headerLgClassName = null
  if (["/", "/home", "/create", "/join", "/rules/setup",  "/rules/0", "/rules/1", "/rules/2", "/rules/3", "/rules/4", ].includes(pathname)) {
    headerLgClassName="header--large"
  }
    return (
        <header>
        <h1 className={`header ${headerLgClassName}`}>Taboo!</h1>
        {pathname === "/home" ? 
            <p className="subheading">
            The team game that’s all about what you{" "}
            <span className="subheading__focus-text">say,</span> and what you{" "}
            <span className="subheading__focus-text">don’t!</span>
          </p>: null
        } 
      </header>
    )
}