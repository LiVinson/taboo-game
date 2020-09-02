import React from "react"
import PropTypes from "prop-types"
import { StyledRadioListItem, RadioInput, RadioLabel } from './style'


//Takes in taboo word, it's index, status, and a cb function that is called when user selects a different word in the list
//Returns a list item with a hidden radio button and label.
const RadioListItem = ({ word, index, status, onChange }) => {
	return (
		<StyledRadioListItem>
			<RadioInput
				type="radio"
				name="does this matter?"
				value={index}
				id={word}
				onChange={(e) => {
					onChange(e.target.value, status)
				}}
			/>
			<RadioLabel htmlFor={word}>{word}</RadioLabel>
		</StyledRadioListItem>
	)
}

export default RadioListItem