import React from "react"
import { Link } from "react-router-dom"

export default function JoinForm({ confirmGame }) {
  const [gameCode, setGameCode] = React.useState("")

  const handleChange = (code) => {
    setGameCode(code)
  }

  return (
    <div>
      <label>Game Code</label>
      <input
        value={gameCode}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        placeholder="Gamecode"
      />
      <span className="join-message"></span>
      <Link
        className="btn"
        to={{
          pathname: "/join",
          search: `?gamecode=${gameCode}`,
        }}
      >
        Join!
      </Link>
    </div>
  )
}
