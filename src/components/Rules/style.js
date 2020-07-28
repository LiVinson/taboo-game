import styled from 'styled-components'

export const RulesTitle = styled.h5`
	font-family: ${(props) => props.theme.text.display};
	font-size: 2rem;
	font-weight: 500;
	text-align: center;
	color: ${(props) => props.theme.color.grayDark2};

	/* Faint gray line after section title*/
	&::after {
		display: block;
		content: '';
		width: 80%;
		height: 1.5px;
		background-color: ${(props) => props.theme.color.lightGray2};
		margin: 0.8rem auto 1rem auto;
	}
`

export const RulesText = styled.p`
	font-size: 1.6rem;
	text-align: justify;
	padding: 0 0.5rem;
	margin-bottom: 1rem;
	color: ${(props) => props.theme.color.grayDark2};
`
