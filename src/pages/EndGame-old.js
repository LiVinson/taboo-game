import React from "react"

export default function EndGame(props) {
    console.log(props)
    const { team1Score } = props.location.state
    const { team2Score } = props.location.state
    const { players } = props.location.state
    // const { players: team2 } = props.location.state.team2

    let winner;

    if (team1Score > team2Score) {
        
        winner = "Team 1"
    } else if (team2Score > team1Score) {
        winner = "Team 2"
    } else {
        winner = "Tie"
    }

    return (
        <div>
            {winner !== "Tie" 
            ? (
                <div>
                    <p>Game Over! {winner} wins!</p>
                    <ul>
                        {players.filter(player => player.team === winner)
                            .map(player => <li style={props.match.params.playerId === player.playerId ? {fontWeight: "bold"} : {}} key={player.playerId}>{player.name}</li>)}
                    </ul>
                </div> 
            )  :(
                <div>
                
                    <p>It's a Tie!</p>
                </div>
            )}
            <div>Final Score:            
                <p>Team 1: {team1Score}</p> 
                <p>Team 2: {team2Score}</p>     
            </div>     
        </div>
    )
}