import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, ErrorMessage } from 'formik'
import { Form, FormSection, FormSectionTitle, TextInput, TextLabel, ErrorText } from 'components/shared/FormElements'

//Validation occurs onChange or onBlur of inputs and onSubmit of form
const validate = (values) => {
	const errors = {}
	if (!values.tabooWord) {
		errors.tabooWord = 'A taboo word is required'
	}
	return errors
}

const SubmitCardForm = (props) => {
	return (
		<Formik
			enableReinitialize={true} //allows form to reset if initial state values change
			initialValues={props.initialValues}
			validate={validate}
			onSubmit={(values, actions) => props.handleSubmit(values, actions)}
		>
			{(formik) => (
				<Form id="submitCardForm">
					<FormSection>
						<TextLabel htmlFor="tabooWord">Taboo Word</TextLabel>
						<Field
							id="tabooWord"
							maxLength={35}
							name="tabooWord"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="1"
						/>
						<ErrorMessage name="tabooWord" component={ErrorText} />
					</FormSection>

					<FormSection padding="1rem">
						<FormSectionTitle>Words You Can't Say (Optional)</FormSectionTitle>

						<TextLabel htmlFor="word1">Word 1</TextLabel>
						<Field
							id="word1"
							maxLength={35}
							name="word1"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="2"
						/>

						<TextLabel htmlFor="word2">Word 2</TextLabel>
						<Field
							id="word2"
							maxLength={35}
							name="word2"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="2"
						/>

						<TextLabel htmlFor="word3">Word 3</TextLabel>
						<Field
							id="word3"
							maxLength={35}
							name="word3"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="3"
						/>

						<TextLabel htmlFor="word4">Word 4</TextLabel>
						<Field
							id="word4"
							maxLength={35}
							name="word4"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="4"
						/>

						<TextLabel htmlFor="word5">Word 5</TextLabel>
						<Field
							id="word5"
							maxLength={35}
							name="word5"
							type="text"
							as={TextInput}
							placeholder=""
							tabIndex="5"
						/>
					</FormSection>
				</Form>
			)}
		</Formik>
	)
}

SubmitCardForm.propTypes = {
	initialValues: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired
}

export default SubmitCardForm
