import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'pages/Home'
import Waiting from 'pages/Waiting'
import PlayGame from 'pages/PlayGame'
import EndGame from 'pages/EndGame'
import { ButtonErrorCard } from 'components/shared/ErrorCard'
import Container from 'components/Container'
import Header from 'components/Header'
import LayeredCards from 'components/LayeredCards'

class App extends React.Component {
	render() {
		return (
			<Router>
				<Container>
					<Route component={Header} />
					<Switch>
						<Route exact path="/">
							<Redirect to="/home" />
						</Route>
						<Route path="/home" component={Home} />
						<Route path="/waiting/:gamecode" component={Waiting} />
						<Route path="/play/:gamecode" component={PlayGame} />
						<Route path="/end/:gamecode" component={EndGame} />
						<Route
							render={(props) => {
								const errorMsg =
									"Uh-oh, I don't think this is where you should be. Try going home and starting again. "
								return <ButtonErrorCard title="Lost?" error={errorMsg} {...props} />
							}}
						/>
					</Switch>
					<LayeredCards />
				</Container>
			</Router>
		)
	}
}

export default App
