import React from 'react'
import PropTypes from 'prop-types'
import { TabooCard } from 'components/shared/TabooCard'

const PostRoundNonWatcher = ({ children }) => {
	return <TabooCard tabooWord={'Cards Played'}>{children}</TabooCard>
}

PostRoundNonWatcher.propTypes = {
	children: PropTypes.node.isRequired
}

export default PostRoundNonWatcher
