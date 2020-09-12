import React from 'react'
import { StyledErrorCard } from './style'
import ButtonContainer from 'components/ButtonContainer'
import ErrorMessage from 'components/shared/ErrorMessage'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import { withRouter } from 'react-router-dom'

const ErrorCard = ({ error, history, url, title }) => {
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

ErrorCard.defaultProps = {
    url: '/home',
    title: "Uh Oh!"
}
//Used to get access to history object
export default withRouter(ErrorCard)
