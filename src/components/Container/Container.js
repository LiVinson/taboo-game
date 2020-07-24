import React from "react"
import styled from "styled-components"
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
    width: 100vw;
    /* background-color: ${props => props.theme.color.lightGray1}; */
    overflow:hidden;

	&:before {
		display:block;
		content: "";
		height: 100%;
		width: 100%;
		background-image: url(/img/pattern-light.png);
		opacity: .6;
		position:absolute;
		top:0;
		left:0;
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
