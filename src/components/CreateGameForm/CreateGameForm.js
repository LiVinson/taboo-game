import React from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"

//Validation occurs onChange or onBlur of inputs and onSubmit of form
const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = "Required"
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
      onSubmit={(values, { setSubmitting }) => props.handleSubmit(values, setSubmitting)}
    >
      {(formik) => (
          <Form id="createGameForm">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />

            <div>
              <p>Game Mode </p>
              <label htmlFor="remote">Remote</label>
              <Field type="radio" id="remote" name="gameMode" value="remote" />

              <label htmlFor="inPerson">In Person</label>
              <Field
                type="radio"
                id="inPerson"
                name="gameMode"
                value="inPerson"
              />
            </div>
            {/* Radio button and drop down combination. Drop down for # of turns/amount of time is disabled if 
                corresponding radio button for that option is not selected */}
            <div>
              <p>End Game Method</p>
              <div>
                <label htmlFor="turns">Turns per Person</label>
                <Field
                  type="radio"
                  id="turns"
                  name="endGameMethod"
                  value="turns"
                />
                <Field
                  name="turnsValue"
                  component="select"
                  disabled={formik.values.endGameMethod === "time"}
                >
                  <option value={1}>1 Turn</option>
                  <option value={2}>2 Turns</option>
                  <option value={3}>3 Turns</option>
                  <option value={4}>4 Turns</option>
                  <option value={5}>5 Turns</option>
                </Field>
              </div>

              <div>
                <label htmlFor="time">Timer</label>
                <Field
                  type="radio"
                  id="time"
                  name="endGameMethod"
                  value="time"
                />
                <Field
                  name="timeValue"
                  component="select"
                  disabled={formik.values.endGameMethod === "turns"}
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </Field>
              </div>
            </div>

            <div>
            <p>Skipping Penalty</p>
            
            <Field type="radio" id="none" name="skipPenalty" value="none" />
            <label htmlFor="none">None</label>

            <Field type="radio" id="halfPoint" name="skipPenalty" value="halfPoint" />
            <label htmlFor="halfPoint">1/2 a Point</label>

            <Field type="radio" id="point" name="skipPenalty" value="point" />
            <label htmlFor="point">1 Point</label>
          </div>

            
            {/* Submit Button is passed down to Taboo Card for UI consistency reasons*/}
         </Form>
        )
      }
    </Formik>
  )
}

export default CreateGameForm
