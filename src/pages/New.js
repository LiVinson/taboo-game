import React from "react"
import queryString from "query-string"
import { v4 as uuidv4 } from "uuid"
import { database } from "../utils/firebase_conn"

function setUnassignedListener(gamecode, setUnassigned) {
  database
    .ref(`games/${gamecode.current}/unassigned`)
    .on("value", function (snapshot) {
      console.log("unassigned changed:")
      const unassigned = snapshot.val()
      console.log(unassigned)
      setUnassigned(unassigned)
    })
}

export default function New({ location }) {
  const query = queryString.parse(location.search)
  const gamecode = React.useRef(query.gamecode)

  const [player, setPlayer] = React.useState({
    name: null,
    host: false,
    id: null,
  })
  const [unassigned, setUnassigned] = React.useState(null) //determines value of unassigned

  //first render, attach listener to unassigned
  React.useEffect(() => {
    console.log("use effect: create player")
    const playerId = uuidv4().split("-")[0]
    const player = {
      name: "Lisa",
      host: true,
    }
    const unassignedPath = `games/${gamecode.current}/unassigned/${playerId}`
    console.log(unassignedPath)
    database
      .ref(unassignedPath)
      .set(player)
      .then((response) => {
        setUnassignedListener(gamecode, setUnassigned)
      })
  }, [gamecode])

  return <p>This is a new page</p>
}
