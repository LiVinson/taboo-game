import React from 'react'
import PropTypes from 'prop-types'
import { StyledRadioListItem, RadioInput, RadioLabel } from './style'

//Takes in taboo word, it's index, status, and a cb function that is called when user selects a different word in the list
//Returns a list item with a hidden radio button and label.
const RadioListItem = ({ word, index, status, checked, onChange }) => {
	return (
		<StyledRadioListItem>
			<RadioInput
				checked={checked}
				type="radio"
				name={status}
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

RadioListItem.propTypes = {
	word: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}
export default RadioListItem
