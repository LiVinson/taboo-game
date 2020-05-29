import React from "react"
import "./TabooCard.scss"
import ButtonGroup from "../ButtonGroup"

export default function TabooCard({ type, tabooWord, list, children, buttonObj=null }) {


  let secondaryClass = null
  if (type) {
    secondaryClass = `taboo-card--${type}`
  }
  return (
      <div className={`taboo-card ${secondaryClass}`}>
        <div className="taboo-card__word-container">
          <p className="taboo-card__word">{tabooWord}</p>
        </div>
        <div className="taboo-card__list-container">
        {children ? children :
          <ul className="taboo-card__list">
          {list.map((item,index) => <li key={index}className="taboo-card__list-item">{item}</li>)}
        </ul>
        }
        
          <ButtonGroup buttonInfo={buttonObj} />
         
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