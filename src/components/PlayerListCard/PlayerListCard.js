import React from 'react'
import PropTypes from 'prop-types'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'

const PlayerListCard = ({ buttonInfo, tabooWord = 'Players', children }) => {
	return buttonInfo ? (
		<ButtonTabooCard tabooWord={tabooWord} buttons={buttonInfo}>
			{children}
		</ButtonTabooCard>
	) : (
		<TabooCard tabooWord={tabooWord}> {children}</TabooCard>
	)
}

PlayerListCard.propTypes = {
	buttonInfo: PropTypes.array,
	tabooWord: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired

}

export default PlayerListCard
