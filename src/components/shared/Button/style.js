import styled from 'styled-components'

/*
  4 types of buttons:

  Button (Styled Button)
  Primary Button (StyledPrimaryButton - extension of Button)
  button-lg (extension of button) or button-lg primary (tbd)
  text button

*/

//Off white button used on the left in forms
export const StyledButton = styled.button`
	width: 47%;
	padding: 0.6rem 0rem;
	border: ${(props) => (props.border ? `2px solid ${props.theme.color.primary}` : 'none')};
	border-radius: 2px;
	background-color: ${(props) => props.theme.color.offWhite};
	font-size: 2.3rem;
	font-family: ${(props) => props.theme.text.display};
	text-transform: uppercase;
	color: ${(props) => props.theme.color.primary};	
	
	&:hover {
		transform: translateY(-2px);
	}

	&:active {
		filter: brightness(0.8);
		transform: translateY(2px);
	}

	&:focus {
		border: none;
		outline: solid 2px ${(props) => props.theme.color.accent1};
	}

	&:disabled {	
		filter: brightness(0.6);
		cursor: wait;
	}
`
//Same as Button, with different font color and background and different focus outline color
export const StyledPrimaryButton = styled(StyledButton)`
	color: ${(props) => props.theme.color.offWhite};
	background-color: ${(props) => props.theme.color.accent1};

	&:focus {
		outline: solid 2px ${(props) => props.theme.color.offWhite};
	}	
`


export const StyledLargeButton = styled(StyledButton)`
	width: 100%;
	padding: 1rem 0;
	border: solid 3px ${(props) => props.theme.color.accent1};
	margin-top: ${(props) => props.margin && '1.2rem'};
	background-color: ${(props) => props.theme.color.lightGray2};
	font-size: 3rem;
	font-weight: 600;	
	color: ${(props) => props.theme.color.primary};
	
	&:focus {
		outline: none;
		border: solid 3px ${(props) => props.theme.color.grayDark1};
	}
`

//Not currently used. TBD if needed
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
