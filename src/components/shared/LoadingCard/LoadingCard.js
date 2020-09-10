import React from 'react'
import { TabooCardTop } from 'components/shared/TabooCard'
import Pending from 'components/shared/Pending'
import { StyledLoadingCard } from "./style"

const LoadingCard = ({ message }) => {
	return (
        <StyledLoadingCard>
            <TabooCardTop>
                <Pending message={message} large={true} />
            </TabooCardTop>
        </StyledLoadingCard>
	)
}

LoadingCard.defaultProps = {
	title: 'Loading',
}

export default LoadingCard
