import { database } from "./firebase_conn"

//Confirms whether gamecode entered is valid
export function confirmGameCode(gamecode) {
  return new Promise(function (resolve, reject) {
    try {
      const ref = database.ref(`games/${gamecode}/status`)
      ref.once("value").then(function (snapshot) {
        const value = snapshot.val() || "does not exist"
        console.log(value)
        if (value === "pending") {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

//Creates initial game object and sets property in
//firebase to gamecode with value of game object.
export async function createNewGame(gamecode) {
  console.log("creating new game")
  const game = {
    status: "pending",
    players: "none", //Set to none to allow a listener to be attached immediately
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
  return await database
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

//Confirms that a firebase path exists in the database.
export function confirmPathExists(pathToCheck) {
  console.log("checking: ", pathToCheck)
  const ref = database.ref(pathToCheck)
  return ref.once("value").then(function (snapshot) {
    return snapshot.exists()
  })
}

/*
Input:
   A gamecode
   The firebase path that requires a listener
   onChange: Function invoked when listener is set and each time a change at the path takes place.

Output:
  Initial attach: Returns a promise with current value at the path of the listner
  Each path update: Calls the onChange function passed. 
*/

function attachListener(path, callback, initialValue) {
  return new Promise(function (resolve, reject) {
    database.ref(path).on("value", function (snapshot) {
      const value = snapshot.val()

      if (value === initialValue) {
        resolve(value)
      } else {
        callback(value)
      }
    })
  })
}
// export function attachListenerToPath(gamecode, [pathToAttach, onChange, compareValue]) {
export async function attachListenerToPath(gamecode, [...attachDetails]) {
  // console.log(attachDetails)
  const returnArr = []

  for (let i = 0; i < attachDetails.length; i++) {
    const { pathToAttach, onChange, initialValue } = attachDetails[i]

    const response = await attachListener(
      `games/${gamecode}/${pathToAttach}`,
      onChange,
      initialValue
    )
    returnArr.push(response)
  }
  return returnArr
}

//Adds the player object to the provided FB path. No "then"
// because a listener callback function is triggered
export function addPlayerToPath(player, path) {
  console.log(path)
  return database
    .ref(path)
    .set(player)
    .catch((err) => {
      console.warn(err)
      return false
    })
}

export function updatePlayerInfo(gamecode, playerId, key, value) {
  const playerRef = `games/${gamecode}/players/${playerId}/`
  console.log(playerRef)
  database
    .ref(`games/${gamecode}/players/${playerId}/`)
    .update({ [key]: value })
}

export function updateGameStatus(gamecode, status) {
  const gameStatusRef = `games/${gamecode}/`
  console.log(gameStatusRef)
  database.ref(gameStatusRef).update({ status: status })
}
export function getDeck(deck) {
  return new Promise(function (resolve, reject) {
    import("./cards").then((obj) => {
      //shuffle Deck
      resolve(obj.default.deck1)
    })
  })
}
