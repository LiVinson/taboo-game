import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Container from "./components/Container"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import New from "./pages/New"
import Join from "./pages/Join"
import Game from "./pages/Game"

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path="/new" component={New} />
          <Route path="/join" component={Join} />
          <Route path="/play" component={Game} />
        </Switch>
      </Container>
    </Router>
  )
}

/*
  Add create game component - page or modal? with form
  On submit - generate code - will be in firebase.
  Update Join to check or success/error of game code:
    /error: Invalid code. Try again.
    /success: Enter name. Save user. Display all players in game.
    start game: Load Game page.
*/
export default App
