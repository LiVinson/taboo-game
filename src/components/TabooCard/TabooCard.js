import React from "react"
import "./TabooCard.scss"
import ButtonGroup from "../ButtonGroup"

/*
Props:
   type(Used for styling cards differently)
  tabooWord: key What is at top of card
  list: Array of words to display in card body 
   */

export default function TabooCard({
  type,
  tabooWord,
  list,
  buttons,
  children  
}) {
  let secondaryClass = null
  if (type) {
    secondaryClass = `taboo-card--${type}`
  }
  return (
    //Wraps entire card
    <div className={`taboo-card ${secondaryClass}`}>
      {/* Contains taboo word*/}
      <div className="taboo-card__word-container">
        <p className="taboo-card__word">{tabooWord}</p>
      </div>
      {/* If there are children, render them as is. Otherwise, loop over list of items and display */}
      <div className="taboo-card__list-container">
        {children ? (
          children
        ) : (
          <ul className="taboo-card__list">
            {list.map((item, index) => (
              <li key={index} className="taboo-card__list-item">
                {item}
              </li>
            ))}
          </ul>
        )}
        { buttons ? <ButtonGroup buttons={buttons} /> : null}
      </div>
    </div>
  )
}

/*

  <div className={`taboo-card ${secondaryClass}`}>
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">Taboo!</p>
        </div>
        <div className="taboo-card__list-container">
          <ul className="taboo-card__list">
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
          </ul>
        </div>
      </div>

      <div className={`taboo-card ${secondaryClass}`}>
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">Taboo!</p>
        </div>
        <div className="taboo-card__list-container">
          <ul className="taboo-card__list">
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
            <li className="taboo-card__list-item">Taboo!</li>
          </ul>
        </div>
      </div>*/
