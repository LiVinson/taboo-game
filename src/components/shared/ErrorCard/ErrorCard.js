import React from 'react'
import { StyledErrorCard } from './style'
import ErrorMessage from 'components/shared/ErrorMessage'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'
import { withRouter } from 'react-router-dom'

export const ErrorCard = ({error, title}) => {
	return (
		<StyledErrorCard>
			<TabooCard tabooWord={title}>
				<ErrorMessage error={error} large={true} />
			</TabooCard>
		</StyledErrorCard>
	)
}
ErrorCard.defaultProps = {
	
	title: 'Uh Oh!',
}

const ButtonErrorCard = ({ error, history, url, title }) => {
	const buttonInfo = [
		{
			text: 'Home',
			onClick: () => {
				history.push(url)
			},
		},
	]

	return (
		<StyledErrorCard>
			<ButtonTabooCard tabooWord={title} buttons={buttonInfo}>
				<ErrorMessage error={error} large={true} />
			</ButtonTabooCard>
		</StyledErrorCard>
	)
}

ButtonErrorCard.defaultProps = {
	url: '/home',
	title: 'Uh Oh!',
}
//Used to get access to history object
export default withRouter(ButtonErrorCard)
