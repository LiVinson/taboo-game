import React from 'react'
import PropTypes from "prop-types"
import Wrapper from 'components/Wrapper'
import Disclaimer from "components/Disclaimer"
import { StyledContainer } from "./style"


const Container = ({ children }) => {
	return (
		<StyledContainer>
			<Wrapper>{children}</Wrapper>
			<Disclaimer />
		</StyledContainer>
	)
}

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container
