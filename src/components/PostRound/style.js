import styled from 'styled-components'

//Adds margin to each card component & button in the entire page, except the last one.
export const StyledPostRound = styled.div`
	& > *:not(:last-child){
		margin-bottom: 2rem;
	}
`
export const PlayedCardList = styled.ul`
    list-style-type:none;
`

export const TabooWord = styled.li`
	display: flex;
	align-items: center;
	width: 100%;
	&:not(:last-child) {
		border-bottom: 1px solid ${props => props.theme.color.lightGray2};
	}

/*selects last list item, and removes the bottom padding from label since it's alrady provided by parent taboo card */
	&:last-child > label {
		padding-bottom: 0;
	}
/*selects first list item, and removes the top padding from label since it's alrady provided by parent taboo card */

	&:first-child > label {
		padding-top: 0;
	}


`

//hidden so only label displays. Selecting a label results in additional styles being applied
export const TabooRadio = styled.input`
	display: none;
	&:checked + label {
		/* font-size: 2.2rem; */
		font-weight:500;
		/* star that displays when the radio button corresponding to this label is checked */
		&:before {
			content: "*";
			width:1rem;
			display: inline-block;
			padding-right: 1rem;
			color: ${props => props.theme.color.accent2};
		}
	}
`

export const TabooLabel = styled.label`
	display: inline-block;
	font-size: 2rem;
	width: 100%;
	padding: 1rem 0rem;
	color: ${props => props.theme.color.grayDark2};

`

export const NoCardMessage = styled.p`
	font-size:2rem;
	color: ${props => props.theme.color.grayDark2};
`
