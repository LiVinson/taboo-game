import React from "react"
import { ButtonTabooCard, TabooCard } from "components/shared/TabooCard"
import TeamList from "components/TeamList"

const PlayerListCard = ({ players, currentPlayer, buttonInfo }) => {
  const team1 = players.filter((player) => player.team === "team1")
  const team2 = players.filter((player) => player.team === "team2")
  const unassigned = players.filter((player) => player.team === "unassigned")

  console.log(team1)
  console.log(team2)
  console.log(unassigned)
  const list = (
    <React.Fragment>
      {team1.length > 0 ? (
        <TeamList
          title="Team 1"
          players={team1}
          currentPlayer={currentPlayer}
        />
      ) : null}
      {team2.length > 0 ? (
        <TeamList
          title="Team 2"
          players={team2}
          currentPlayer={currentPlayer}
        />
      ) : null}
      {unassigned.length > 0 ? (
        <TeamList
          title="Team 2"
          players={unassigned}
          currentPlayer={currentPlayer}
        />
      ) : null}
    </React.Fragment>
  )

  if (buttonInfo) {
    return (
      <ButtonTabooCard tabooWord="Players" buttons={buttonInfo}>
        {list}
      </ButtonTabooCard>
    )
  } else {
    return <TabooCard tabooWord="Players">{list}</TabooCard>
  }
}

export default PlayerListCard
