import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.scss"
import Container from "./components/Container"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import New from "./pages/New"
import Game from "./pages/PlayGame"
import EndGame from "./pages/EndGame"

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path="/new/:gamecode/:playerId" component={New} />
            <Route path="/play/:gamecode/:playerId" component={Game} />
            <Route path="/end/:gamecode/:playerId" component={EndGame}/>
            </Switch>
      </Router>
    )
  }
}

/*

Next Steps:
- Before generating game code, ask for username.
- Create player object.
- Generate game code and attach listner (done)
- If waiting is empty, add player as unassigned and set as host.
- Save player's id in state.
- On click of start game: assign players to a team and set team name.
*/
export default App
