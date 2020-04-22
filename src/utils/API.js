import { database } from "./firebase_conn"

//Creates initial game object and sets property in
//firebase to gamecode with value of game object.
export async function createNewGame(gamecode) {
  console.log("creating new game")
  const game = {
    status: "pending",
    unassigned: "none", //Set to none to allow a listener to be attached immediately
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
export function attachListenerToPath(gamecode, pathToAttach, onChange) {
  return new Promise(function (resolve, reject) {
    try {
      database
        .ref(`games/${gamecode}/${pathToAttach}`)
        .on("value", function (snapshot) {
          const value = snapshot.val()
          //Value at path is none when no relevant children were previously added
          if (value === "none") {
            return resolve(value)
            //Path contains relevant values
          } else {
            onChange(value)
          }
        })
    } catch (err) {
      reject(err)
    }
  })
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
