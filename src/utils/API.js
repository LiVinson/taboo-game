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

//
export function confirmPathExists(pathToCheck) {
  console.log("checking: ", pathToCheck)
  const ref = database.ref(pathToCheck)
  return ref.once("value").then(function (snapshot) {
    return snapshot.exists()
  })
}

export function attachListenerToPath(gamecode, pathToAttach) {
  return new Promise(function (resolve, reject) {
    try {
      database
        .ref(`games/${gamecode}/${pathToAttach}`)
        .on("value", function (snapshot) {
          console.log("listener attached to", pathToAttach)
          const value = snapshot.val()
          resolve(value)
        })
    } catch (err) {
      reject(err)
    }
  })

  // const ref = database.ref(`games/${gamecode}/${pathToAttach}`)

  //   await ref.on("value", function (snapshot) {
  //     console.log("listener attached to", pathToAttach)
  //     const value = snapshot.val()
  //     console.log(value)
  //     return value
  //   })

  // await attachListenerAsync(gamecode, pathToAttach)
  // console.log("listener complete, returning")
  // return true
}

function attachListenerAsync(gamecode, pathToAttach, resolve, reject) {}

export async function addPlayerToPath(player, path) {
  console.log(path)
  database
    .ref(path)
    .set(player)
    .then(() => {
      console.log("player created")
      return true
    })
    .catch((err) => {
      console.warn(err)
      return false
    })
}

// function requestGameData(code) {
//   console.log("requesting game data...")
// }

// function endGame() {
//   console.log("game over")
// }
