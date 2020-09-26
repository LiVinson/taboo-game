import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }

`

export const StyledSpinner = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border: ${(props) => props.theme.color.grayDark1} solid 1.8rem;
	border-radius: 50%;
	border-top: ${(props) => props.theme.color.primary} solid 1.8rem;
	width: 9rem;
	height: 9rem;
	animation: ${spin} 2s linear infinite;
  	box-shadow: 0px 2px 1rem rgba(0, 0, 0, 0.5); 
`
