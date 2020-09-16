import React from 'react'
import PropTypes from 'prop-types'
import { TabooCard } from 'components/shared/TabooCard'
import TextLink from 'components/shared/TextLink'
import ErrorMessage from 'components/shared/ErrorMessage'
const MainMenu = ({ match }) => {
	const { path } = match

	const cardInfo = {
		tabooWord: 'Menu',
		list: [
			<TextLink to={`${path}/create`} text={'Create New Game'} />,
			<TextLink to={`${path}/join`} text={'Join Game'} />,
			<TextLink to={`${path}/rules`} text={'How to Play'} />,
			<TextLink to="/" text={'Submit a Card'} />,
		],
	}
	return <TabooCard {...cardInfo} />
}

MainMenu.propTypes = {
	match: PropTypes.object.isRequired,
}

export default MainMenu
