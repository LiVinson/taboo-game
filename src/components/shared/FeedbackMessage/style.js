import styled from 'styled-components'

export const StyledErrorMessage = styled.p`
	font-size: ${(props) => (props.large ? '2.2rem' : '1.5rem')};
	font-style: ${(props) => (props.large ? 'inherit' : 'italic')};
	color: ${(props) => (props.large || props.light ? props.theme.color.grayDark1 : 'red')};
	background-color: ${(props) => props.light && props.theme.color.offWhite};
`

export const StyledSuccessMessage = styled(StyledErrorMessage)`
	color: green;
`
