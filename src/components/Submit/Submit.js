import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SubmitCardForm from 'components/SubmitCardForm'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import InstructionsText from 'components/shared/InstructionsText'
import Pending from 'components/shared/Pending'
import { ErrorMessage, SuccessMessage } from 'components/shared/FeedbackMessage'
import { submitCardIdea } from 'store/actions/cardActions'

export class Submit extends React.Component {
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

	//actions passed from Formik
	handleSubmit = (values, actions) => {
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
				//Saves card idea in firestore
				const cardIdea = {
					tabooWord: this.state.tabooWord,
					tabooList: [this.state.word1, this.state.word2, this.state.word3, this.state.word4, this.state.word5, ]
				}
				this.props.submitCardIdea(cardIdea).then(() => {
					actions.setSubmitting(false)
					this.displaySuccess()
				})
			}
		)
	}

	componentWillUnmount() {
		clearTimeout(this.timeOut)
	}

	//Removes success message after 2 seconds and resets state, which clears form
	clearSuccess = () => {
		this.timeOut = setTimeout(() => {
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
				successMsg: 'Card idea submitted!',
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
				<InstructionsText>
					Submit your taboo card idea and maybe you will see it the next time you play!
				</InstructionsText>
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

Submit.propTypes = {
	history: PropTypes.object.isRequired,
	error: PropTypes.string,
	isPending: PropTypes.bool.isRequired,
	submitCardIdea: PropTypes.func.isRequired,
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
