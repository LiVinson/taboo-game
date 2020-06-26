import React from "react"
import PropTypes from "prop-types"
import "./Header.scss"


export default function Header({ location }){
  const pathname = location.pathname
  let headerLgClassName = null
  //If on one of the home routes, make header larger
  if (pathname.includes("home")) {
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

Header.propTypes = {
  location: PropTypes.object.isRequired
}