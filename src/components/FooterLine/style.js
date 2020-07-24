import styled from 'styled-components'

export const StyledFooterLine = styled.div`

	width: 60%;
	height: 2px;
	position: absolute;
	bottom: 3rem;
	left: 50%;
	transform:translateX(-50%)  rotate(-6deg);
	z-index:0;
	background-color: ${(props) => props.theme.color.primary};


&::after {
	display:block;
	content:"";
	width: 100%;
	height: 2px;
	/* position: absolute;
	bottom: 3rem;
	left: 50%;
	margin-left: -30%;
	border-bottom: ${(props) => props.theme.color.primary} solid 2px; */
	/* box-shadow: 0px 2px 1rem rgba(0, 0, 0, 0.5); */
	transform: rotate(12deg);
	background-color: ${(props) => props.theme.color.primary};

`
