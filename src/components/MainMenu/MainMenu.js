import React from "react"
import {  NavLink } from "react-router-dom"
import "./MainMenu.scss"
import TabooCard from "../../components/TabooCard"



export default function MainMenu({ match }) {
    const { path } = match
  return (    
    //Main menu taboo card.
        <TabooCard
          type="home"
          tabooWord="Menu"
          list={[
            <NavLink className="taboo-card__link" to={`${path}/create`}>Create New Game</NavLink>,
            <NavLink className="taboo-card__link" to={`${path}/join`}>Join Game</NavLink>,
            <NavLink className="taboo-card__link" to={`${path}/rules/0`}>How to Play</NavLink>,
            "Submit a Card",
            ]}
           /> 
  )
}