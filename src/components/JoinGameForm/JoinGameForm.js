import React from "react"
import PropTypes from "prop-types"
import { Formik, Field, ErrorMessage } from "formik"
import {
  Form,
  FormSection, 
  TextInput, 
  TextLabel,
  ErrorText,
} from "components/shared/FormElements"

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = "Name is Required"
  } else if (values.name.length > 25) {
    errors.name = "Must be 25 characters or less"
  }

  if (!values.gamecode) {
    errors.gamecode = "Game code is required"
  }
  return errors
}

const JoinGameForm = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) =>
        props.handleSubmit(values, setSubmitting)
      }
    >
      {(formik) => (
        <Form id="joinGameForm">
          <FormSection>
            <TextLabel htmlFor="name">Enter Your Name</TextLabel>
            <Field
              name="name"
              type="text"
              as={TextInput}
              placeholder=""
              tabIndex="1"
            />
            <ErrorMessage name="name" component={ErrorText} />
          </FormSection>
          <FormSection>
          <TextLabel htmlFor="gamecode">Enter a Game Code</TextLabel>
          <Field
            name="gamecode"
            type="text"
            as={TextInput}
            placeholder=""
            tabIndex="1"
          />
          <ErrorMessage name="gamecode" component={ErrorText} />
          </FormSection>
        </Form>
      )}
    </Formik>
  )
}

JoinGameForm.propTypes = {
  initialValues: PropTypes.object.isRequired
}

export default JoinGameForm
