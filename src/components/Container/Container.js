import React from "react"
import styled from "styled-components"
import Wrapper from 'components/Wrapper'


const StyledContainer = styled.div`
    width: 100vw;
    background-color: ${props => props.theme.color.lightGray1};
    overflow:hidden;
`
const Container = ({ children }) => {
	return (
		<StyledContainer>
			<Wrapper>{children}</Wrapper>
		</StyledContainer>
	)
}

export default Container
