import styled from 'styled-components'

/*
  4 types of buttons:

  button
  button primary (extension of button)
  button-lg (extension of button) or button-lg primary (tbd)
  text button

*/

export const StyledButton = styled.button`
	border: ${(props) => (props.border ? `2px solid ${props.theme.color.primary}` : 'none')};
	color: ${(props) => props.theme.color.primary};
	background-color: ${(props) => props.theme.color.offWhite};
	width: 47%;
	padding: 0.6rem 0rem;
	border-radius: 2px;
	font-size: 2.3rem;
	font-family: ${(props) => props.theme.text.display};
	text-transform: uppercase;

	&:hover {
		/* TBD */
	}

	&:active {
		outline: none;
		filter: brightness(0.8);
		transform: translateY(2px);
	}

	&:focus {
		border: none;
		outline: solid 2px ${(props) => props.theme.color.accent1};
	}

	&:disabled {
		/* To add: additional styling */
		filter: brightness(0.4);
	}
`
export const StyledPrimaryButton = styled(StyledButton)`
	/* border: 2px solid ${(props) => props.theme.color.offWhite}; */
	color: ${(props) => props.theme.color.offWhite};
	background-color: ${(props) => props.theme.color.accent1};
	width: 47%;
	
	&:active {
		filter: brightness(1.2);
	}

	&:focus {
		outline: solid 2px ${(props) => props.theme.color.offWhite};
	}

	
`
export const StyledLargeButton = styled(StyledButton)`
	width: 100%;
	padding: 1rem 0;
	font-size: 3rem;
	flex: 1 0 100%;
	margin-top: ${(props) => props.margin && '1.2rem'};
	border: solid 3px ${(props) => props.theme.color.accent1};
	background-color: ${(props) => props.theme.color.lightGray2};
	color: ${(props) => props.theme.color.primary};
	font-weight: 600;

	&:focus {
		outline: none;
		border: solid 3px ${(props) => props.theme.color.grayDark1};
	}
`

export const StyledTextButton = styled.button`
	display: inline-block;
	font-size: 2.5rem;
	font-weight: 400;
	background-color: inherit;
	color: ${(props) => props.theme.color.primary};
	border: none;
	padding: 0.8rem;
	padding-bottom: 0rem;
	font-family: ${(props) => props.theme.text.display};
	width: fit-content;

	&::after {
		content: '';
		display: block;
		height: 2px;
		width: 100%;
		background-color: currentColor;
		margin-top: 0.5rem;
	}

	&:visited {
		color: ${(props) => props.theme.color.primary};
	}
	&:active,
	&:focus {
		outline: none;
		color: ${(props) => props.theme.color.grayDark2};
	}
`
