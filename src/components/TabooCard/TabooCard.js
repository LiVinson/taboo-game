import React from "react"
import "./TabooCard.scss"
import ButtonContainer from "components/ButtonContainer"
import PropTypes from "prop-types"
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
  children,
    
}) {
  let secondaryClass = null
  //types: home, middle, bottom
  if (type) {
    secondaryClass = `taboo-card--${type}`
  }  
  return (
    //Wraps entire card
    <div className={`taboo-card ${secondaryClass ? secondaryClass: ""}`}>
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
      </div>
      { buttons ? <ButtonContainer buttons={buttons} /> : null}

    </div>
  )
}

TabooCard.propTypes = {
  type: PropTypes.string,
  tabooWord: PropTypes.string.isRequired,
  list: PropTypes.array,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    click: PropTypes.func
  }))
}