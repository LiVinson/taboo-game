import React from 'react'
import {connect} from "react-redux"
import SubmitCardForm from "components/SubmitCardForm"
import { ButtonTabooCard } from 'components/shared/TabooCard'
import InstructionsCard from 'components/InstructionsCard'
import Pending from 'components/shared/Pending'
import ErrorMessage from 'components/shared/ErrorMessage'
import { submitCardIdea } from "store/actions/cardActions"

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
		}
	}

	handleSubmit = (values, setSubmitting) => {
		console.log('submitting')
		console.log(values)
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
				this.props.submitCardIdea(this.state)
			}
		)
	}

	handleBackClick = () => {
		this.props.history.push('/home')
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

                <SubmitCardForm initialValues={this.state} handleSubmit = {this.handleSubmit}/>
                {this.props.isPending ? <Pending speed={300} message="Creating new game" /> : null}
                {this.props.error ? <ErrorMessage error="There was a problem submitting your card idea. Please try again." /> : null}
            </ButtonTabooCard>
            </React.Fragment>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitCardIdea: (cardIdea) => {dispatch(submitCardIdea(cardIdea))}
	}
}

export default connect(null, mapDispatchToProps)(Submit)