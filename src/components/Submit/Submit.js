import React from 'react'
import { connect } from 'react-redux'
import SubmitCardForm from 'components/SubmitCardForm'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import InstructionsCard from 'components/InstructionsCard'
import Pending from 'components/shared/Pending'
import {ErrorMessage, SuccessMessage} from 'components/shared/FeedbackMessage'
import { submitCardIdea } from 'store/actions/cardActions'

class Submit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabooWord: '',
			word1: '',
			word2: '',
			word3: '',
			word4: '',
			word5: '',
			successMsg: '',
		}
	}

	timeOut = null

	handleBackClick = () => {
		this.props.history.push('/home')
	}

	handleSubmit = (values, actions) => {
		console.log('submitting')
		console.log(values)
		console.log(actions)
		this.setState(
			{
				tabooWord: values.tabooWord,
				word1: values.word1,
				word2: values.word2,
				word3: values.word3,
				word4: values.word4,
				word5: values.word5,
			},
			() => {
				this.props
					.submitCardIdea(this.state)
					.then(() => {
						console.log('promise complete')
						console.log(actions)
						actions.setSubmitting(false)
						actions.resetForm({})
						this.displaySuccess()
					})
					.catch((error) => {
						console.log(error)
					})
			}
		)
	}

	componentWillUnmount() {
		console.log('clearing')
		clearTimeout(this.timeOut)
	}

	clearSuccess = () => {
		this.timeOut = setTimeout(() => {
			console.log("clear")
			this.setState({
				tabooWord: '',
				word1: '',
				word2: '',
				word3: '',
				word4: '',
				word5: '',
				successMsg: '',
			})
		}, 2000)
	}

	displaySuccess = () => {
		this.setState(
			{
				successMsg: 'Success!',
			},
			() => {
				this.clearSuccess()
			}
		)
	}

	render() {
		const buttonInfo = [
			{
				text: 'Back',
				onClick: this.handleBackClick,
			},
			{
				form: 'submitCardForm',
				text: 'Submit',
				type: 'submit',
				disabled: this.props.isPending,
			},
		]
		return (
			<React.Fragment>
				<InstructionsCard>
					Submit your taboo card idea and maybe you will see it the next time you play!
				</InstructionsCard>
				<ButtonTabooCard tabooWord="Have an Idea?" buttons={buttonInfo}>
					<SubmitCardForm initialValues={this.state} handleSubmit={this.handleSubmit} />
					{this.props.isPending ? <Pending speed={300} message="Submitting card idea." /> : null}
					{this.props.error ? (
						<ErrorMessage error="There was a problem submitting your card idea. Please try again." />
					) : null}
					{this.state.successMsg && <SuccessMessage message={this.state.successMsg} />}
				</ButtonTabooCard>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.cards.error ? state.cards.errorMessage : null ? state.cards.errorMessage : null,
		isPending: state.cards.pending,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		submitCardIdea: (cardIdea) => dispatch(submitCardIdea(cardIdea)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)
