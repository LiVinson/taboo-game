import React from 'react'
import PropTypes from "prop-types"
import { Switch, Route } from 'react-router-dom'
import MainMenu from 'components/MainMenu'
import CreateGame from 'components/CreateGame'
import JoinGame from 'components/JoinGame'
import Rules from 'components/Rules'
import Submit from 'components/Submit'

export default function Home({ match }) {
	const { path } = match
	//return one of series of routes based on current home path
	return (
			<Switch>
				<Route path={path} exact component={MainMenu} />
				<Route path={`${path}/create`} component={CreateGame} />
				<Route path={`${path}/join`} component={JoinGame} />
				<Route path={`${path}/rules`} component={Rules} />
				<Route path={`${path}/submit`} component={Submit} />

			</Switch>
	)
}

Home.propTypes = {
	match : PropTypes.object.isRequired
}
