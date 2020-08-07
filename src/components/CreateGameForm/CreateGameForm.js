import React from "react"
import PropTypes from "prop-types"
import { Formik, Field, ErrorMessage } from "formik"
import { 
  Form,
  FormSection,
  FormSectionTitle,
  InputGroup,
  TextInput,
  RadioButton,
  DropDown,Label,TextLabel,ErrorText

} from "components/shared/FormElements"

//Validation occurs onChange or onBlur of inputs and onSubmit of form
const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = "Name is Required"
  } else if (values.name.length > 25) {
    errors.name = "Must be 25 characters or less"
  }
  return errors
}

/*Formik component accepts a function as child component that returns form and props to set defaults.
Function argument is the same object returned by the useFormik hook. Field automatically passes the corresponsing
initial values, onChange, onBlur etc; based on the name of each Field. 
*/

const CreateGameForm = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) =>
        props.handleSubmit(values, setSubmitting)
      }
    >
      {(formik) => (
        <Form id="createGameForm">
          <FormSection>
            <TextLabel htmlFor="name">
              Enter Your Name
            </TextLabel>
            <Field id="name" maxLength={20} name="name" type="text" as={TextInput} placeholder=""  tabIndex="1"/>
            <ErrorMessage name="name" component={ErrorText} />
          </FormSection>

          {/* Leaving for future:
            
            <FormSection padding="1rem">
            <FormSectionTitle>Game Mode </FormSectionTitle>
            <InputGroup>
              <Field
                type="radio"
                as={RadioButton}
                id="remote"
                name="gameMode"
                value="remote"
                tabIndex="2"
              />
              <Label htmlFor="remote">Remote</Label>
            </InputGroup>
            <InputGroup>
              <Field
                type="radio"
                as={RadioButton}
                id="inPerson"
                name="gameMode"
                value="inPerson"
         
              />
              <Label htmlFor="inPerson">In Person</Label>
            </InputGroup>
      </FormSection> */}
          {/* Radio button and drop down combination. Drop down for # of turns/amount of time is disabled if 
                corresponding radio button for that option is not selected */}

          <FormSection padding="1rem">
            <FormSectionTitle>End Game Method</FormSectionTitle>
            <InputGroup>
              <Field
                type="radio"
                as={RadioButton}
                id="turns"
                name="endGameMethod"
                value="turns"
                tabIndex="3"
              />
              <Label htmlFor="turns">Turns per Person</Label>
            </InputGroup>
            <Field
              name="turnsValue"
              as={DropDown}
              disabled={formik.values.endGameMethod === "time"}
              tabIndex="4"
            >
              <option value={1}>1 Turn</option>
              <option value={2}>2 Turns</option>
              <option value={3}>3 Turns</option>
              <option value={4}>4 Turns</option>
              <option value={5}>5 Turns</option>
            </Field>
            <InputGroup>
              <Field
                as={RadioButton}
                type="radio"
                id="time"
                name="endGameMethod"
                value="time"
                tabIndex="5"
              />
              <Label htmlFor="time">Timer</Label>
            </InputGroup>
            <Field
              name="timeValue"
              as={DropDown}
              disabled={formik.values.endGameMethod === "turns"}
              tabIndex="6"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </Field>
          </FormSection>
          <FormSection padding="1rem">
            <FormSectionTitle>Skipping Penalty</FormSectionTitle>
            <InputGroup>
              <Field
                as={RadioButton}
                type="radio"
                id="none"
                name="skipPenalty"
                value="none"
                tabIndex="7"
              />
              <Label htmlFor="none">None</Label>
            </InputGroup>
            <InputGroup>
              <Field
                as={RadioButton}
                type="radio"
                id="halfPoint"
                name="skipPenalty"
                value="halfPoint"         
              />
              <Label htmlFor="halfPoint">1/2 a Point</Label>
            </InputGroup>
            <InputGroup>
              <Field
                as={RadioButton}
                type="radio"
                id="point"
                name="skipPenalty"
                value="point"             
              />
              <Label htmlFor="point">1 Point</Label>
            </InputGroup>
          </FormSection>
          {/* Submit Button is passed down to Taboo Card for UI consistency reasons*/}
        </Form>
        )
      }
    </Formik>
  )
}

CreateGameForm.propTypes = {
  initialValues: PropTypes.object.isRequired
}
export default CreateGameForm
