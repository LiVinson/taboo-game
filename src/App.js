import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Container from 'components/Container'
import Header from 'components/Header'
import LayeredCards from 'components/LayeredCards'
import LoadingSpinner from 'components/shared/LoadingSpinner'
//Code splitting routes
const Home = lazy(() => import('pages/Home'))
const Waiting = lazy(() => import('pages/Waiting'))
const PlayGame = lazy(() => import('pages/PlayGame'))
const EndGame = lazy(() => import('pages/EndGame'))
const NotFound = lazy(() => import('pages/NotFound'))

class App extends React.Component {
	componentDidMount() {
		const consoleMsg = `Hey There! Thanks for checking out my project! I'm looking for my next software developer position, so if you really like and you're hiring, you can find my contact information and resume HERE!`
		console.log(consoleMsg)
	}

	render() {
		return (
			<Router>
				<Container>
					<Route component={Header} />
					<Suspense fallback={<LoadingSpinner />}>
						<Switch>
							<Route exact path="/">
								<Redirect to="/home" />
							</Route>
							<Route path="/home" component={Home} />
							<Route path="/waiting/:gamecode" component={Waiting} />
							<Route path="/play/:gamecode" component={PlayGame} />
							<Route path="/end/:gamecode" component={EndGame} />
							<Route component={NotFound} />
						</Switch>
					</Suspense>
					<LayeredCards />
				</Container>
			</Router>
		)
	}
}

export default App
