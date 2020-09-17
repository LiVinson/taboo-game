import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import rules from './rulesText'
import { RulesTitle, RulesText } from './style'

/*
  Can be displayed in 2 ways: on it's own route or within the play route.
  If on home route closing instructions goes back to /home. If on play route,
  calls a callback provided from GameInfo that will toggle Rules closed.
*/
export default class Rules extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentRule: 0,
		}
	}

	//When user clicks Back. If already showing first rule, either call toggleGameInfo (during game play)
	//or return to home route. Otherwise set state to previous rule
	displayPreviousRule = (event) => {
		const { currentRule } = this.state
		if (currentRule > 0) {
			this.setState((state) => {
				return {
					currentRule: state.currentRule - 1,
				}
			})
		} else {
			if (this.props.toggleGameInfo) {
				this.props.toggleGameInfo(event)
			} else {
				this.props.history.push('/home')
			}
		}
	}

	//When user clicks Next. If already showing last rule, either call toggleGameInfo (during game play)
	//or return to home route. Otherwise set state to next rule
	displayNextRule = (event) => {
		const { currentRule } = this.state
		if (currentRule < rules.length - 1) {
			this.setState((state) => {
				return {
					currentRule: state.currentRule + 1,
				}
			})
		} else {
			if (this.props.toggleGameInfo) {
				this.props.toggleGameInfo(event)
			} else {
				this.props.history.push('/home')
			}
		}
	}

	render() {
		const { currentRule } = this.state
		const buttonInfo = [
			{
				text: currentRule > 0 ? 'Back' : 'Close',
				onClick: this.displayPreviousRule,
				name: this.props.toggleGameInfo && 'showRules',
				type: 'button',
			},
			{
				text: currentRule < rules.length - 1 ? 'Next' : 'Close',
				onClick: this.displayNextRule,
				name: this.props.toggleGameInfo && 'showRules',
				type: 'button',
			},
		]

		return (
			<ButtonTabooCard tabooWord="How to Play" buttons={buttonInfo} type="home">
				<DisplayRulesText topicId={currentRule} />
			</ButtonTabooCard>
		)
	}
}

Rules.propTypes = {
	history: PropTypes.object,
	toggleGameInfo: PropTypes.func,
}

//Loops over imported array of rules and displays title and paragraphs for rule displayed
const DisplayRulesText = ({ topicId }) => {
	const rulesInfo = rules[topicId]
	if (rulesInfo) {
		return (
			<React.Fragment>
				<RulesTitle>{rulesInfo.title}</RulesTitle>
				{rulesInfo.text.map((paragraph, index) => (
					<RulesText key={index}>{paragraph}</RulesText>
				))}
			</React.Fragment>
		)
	} else {
		//Shouldn't be possible, but just in case.
		return <Redirect to="/404" />
	}
}

DisplayRulesText.propTypes = {
	topicId: PropTypes.number.isRequired,
}
