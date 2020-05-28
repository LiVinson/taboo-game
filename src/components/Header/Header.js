import React from "react"
import "./Header.scss"


export default function Header({ homepage }){
    return (
        <header>
        <h1 className="header header--large">Taboo!</h1>
        {homepage ? 
            <p className="subheading">
            The team game that’s all about what you{" "}
            <span className="subheading__focus-text">say,</span> and what you{" "}
            <span className="subheading__focus-text">don’t!</span>
          </p>: null
        } 
      </header>
    )
}