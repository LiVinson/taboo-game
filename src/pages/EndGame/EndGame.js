import React from 'react'
import PlayerListCard from 'components/PlayerListCard'

// const EndGame = ({ players, currentPlayer, team1Score, team2Score }) => {
    const EndGame = () => {

    //Dummy data - will be passed from database
    const players = [
        { id: 12345, name: "Alexa", team: "team1" },
        { id: 12346, name: "Stephen", team: "team1" },
        { id: 12347, name: "Yumani", team: "team2" },
        { id: 12348, name: "Faith", team: "team1" },
        { id: 12349, name: "Lisa", team: "team2" },
        { id: 12340, name: "Danielle", team: "team2" },
      ]
      const team1Score = 20;
      const team2Score = 30;
      const currentPlayer = 12349
    
    let winMessage = ''
	if (team1Score > team2Score) {
		winMessage = 'Team 1 Win!'
	} else if (team2Score > team1Score) {
		winMessage = 'Team 2 Wins!'
	} else {
		winMessage = "It's a Tie!"
	}

	return <PlayerListCard players={players} currentPlayer={currentPlayer} tabooWord={winMessage} />
}

export default EndGame
