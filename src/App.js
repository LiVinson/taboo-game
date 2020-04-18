import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Container from "./components/Container"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import New from "./pages/New"
import Join from "./pages/Join"

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path="/new" component={New} />
          <Route path="/join" component={Join} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
