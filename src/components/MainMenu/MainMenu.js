import React from "react"
import {  NavLink } from "react-router-dom"
import "./MainMenu.scss"
import TabooCard from "../../components/TabooCard"



export default function MainMenu() {
  return (    
    //Main menu taboo card.
        <TabooCard
          type="home"
          tabooWord="Menu"
          list={[
            <NavLink className="taboo-card__link" to="/create">Create New Game</NavLink>,
            <NavLink className="taboo-card__link" to="/join">Join Game</NavLink>,
            <NavLink className="taboo-card__link" to="/rules/0">How to Play</NavLink>,
            "Submit a Card",
            ]}
           /> 
  )
}