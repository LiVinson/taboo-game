import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import "./App.scss"

import Home from "./pages/Home"
import CreateGame from "./pages/CreateGame"
import JoinGame from "./pages/JoinGame"
import Rules from "./pages/Rules"


import New from "./pages/New"
import Game from "./pages/PlayGame"
import EndGame from "./pages/EndGame"



import Wrapper from "./components/Wrapper"
import Header from "./components/Header"
import TabooCard from "./components/TabooCard"
class App extends React.Component {
  render() {
    return (
      <Router>
          <Wrapper>         
                <Route component={Header}  />
                <Switch>
                  <Route path={"/"} exact component={Home}  />
                  <Route path="/create" component={CreateGame} />
                  <Route path="/join" component={JoinGame} />
                  <Route path="/rules/:topic" component={Rules} />
                  

                  <Route path="/new/:gamecode/:playerId" component={New} />
                  <Route path="/play/:gamecode/:playerId" component={Game} />
                  <Route path="/end/:gamecode/:playerId" component={EndGame}/>
              </Switch>
          <TabooCard
              type="middle"
              tabooWord="Taboo"
              list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
          />
          <TabooCard
              tabooWord="Menu"
              type="bottom"
              list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
          />
          <div className="footer-line"></div>
        </Wrapper>

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
