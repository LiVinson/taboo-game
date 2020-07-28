import styled from 'styled-components'

export const StyledRoundInfo = styled.div`
	font-family: ${(props) => props.theme.text.display};
	font-size: 2rem;
	color: ${(props) => props.theme.color.grayDark2};
	text-align: center;
	background-color: ${(props) => props.theme.color.offWhite}80;
	border: solid 2px ${(props) => props.theme.color.accent3};
	border-radius: 3px;
	margin-bottom: 2rem;
	padding: 1rem 0rem;
`
export const RoundNumber = styled.p`
	font-size: 2.5rem;
	color: ${(props) => props.theme.color.primary};
	&:after {
		display: block;
		content: '';
		width: 80%;
		height: 1.5px;
		margin: 0.5rem auto;
		background-color: ${(props) => props.theme.color.lightGray2};
	}
`

export const Role = styled.p`
	margin: 0.8rem auto 1rem auto;
`
