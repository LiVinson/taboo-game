import React from 'react'
import styled from 'styled-components'
import Wrapper from 'components/Wrapper'

/*
Background favorites:
- brushed_alu.png
- cubes.png
- funky-lines.png
- old_wall.png
- paper_3.png


-tactile_noise (dark theme)

*/
const StyledContainer = styled.div`
	position: relative;
	width: 100%;
	width: 100vw;
	max-width: 100vw;
	min-height: 100vh;
	overflow:hidden;

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
const Container = ({ children }) => {
	return (
		<StyledContainer>
			<Wrapper>{children}</Wrapper>
		</StyledContainer>
	)
}

export default Container
