import styled from 'styled-components'

export const StyledContainer = styled.div`
	position: relative;
	width: 100vw;

	min-height: 100vh;
	overflow: hidden;
	/* 
    Used for background image. Fills entire Container div. Before used so opacity does not impact children elements */
	&:before {
		display: block;
		content: '';
		height: 100%;
		width: 100%;
		background-image: url(/img/pattern-light.png);
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
	}
`
