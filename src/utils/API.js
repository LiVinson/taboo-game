import { database } from "./firebase_conn"

// function validateGameCode(code) {
//   console.log("validating game code")
// }

//Creates initial game object and sets property in
//firebase to gamecode with value of game object.
export async function createNewGame(gamecode) {
  console.log("creating new game")
  const game = {
    status: "pending",
    unassigned: [],
    team1: {
      teamName: "Team 1",
      players: [],
      score: 0,
    },
    team2: {
      teamName: "Team 2",
      players: [],
      score: 0,
    },
  }
  await database
    .ref(`games/${gamecode}`)
    .set(game)
    .then(() => {
      return true
    })
    .catch((err) => {
      console.warn(err)
      return err
    })
}

// function requestGameData(code) {
//   console.log("requesting game data...")
// }

// function endGame() {
//   console.log("game over")
// }
