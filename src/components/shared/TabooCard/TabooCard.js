import React from 'react'
import PropTypes from 'prop-types'
import {
	StyledTabooCard,
	StyledLayeredTabooCard,
	TabooWordContainer,
	TabooBody,
	StyledTabooList,
	StyledListItem,
} from './style'
import ButtonContainer from 'components/ButtonContainer'

//Primary TabooCard component used for main menu and game
export const TabooCard = ({ tabooWord, list, children }) => {
	return (
		<StyledTabooCard >
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
			<TabooBody>{children ? children : <TabooList list={list} />}</TabooBody>
		</StyledTabooCard>
	)
}

TabooCard.propTypes = {
	tabooWord: PropTypes.string.isRequired,
	list: PropTypes.array,
	children: PropTypes.node,
}

//Same as TabooCard, but includes 2 -3 buttons
export const ButtonTabooCard = ({ tabooWord, list, buttons, children }) => {
	return (
		<StyledTabooCard>
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
			<TabooBody>{children ? children : <TabooList list={list} />}</TabooBody>
			<ButtonContainer buttons={buttons} />
		</StyledTabooCard>
	)
}

ButtonTabooCard.propTypes = {
	tabooWord: PropTypes.string.isRequired,
	buttons: PropTypes.array.isRequired,
	list: PropTypes.array,
	children: PropTypes.node,
}

//Used for background element
export const LayeredTabooCard = ({ tabooWord, list, layer }) => {
	return (
		<StyledLayeredTabooCard layer={layer}>
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
			<TabooBody>
				<TabooList list={list} />
			</TabooBody>
		</StyledLayeredTabooCard>
	)
}

LayeredTabooCard.propTypes = {
	tabooWord: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	layer: PropTypes.string.isRequired
}

const TabooList = ({ list }) => {
	return (
		<StyledTabooList>
			{list.map((listItem, index) => (
				<TabooListItem listItem={listItem} key={index} />
			))}
		</StyledTabooList>
	)
}

TabooList.propTypes = {
	list: PropTypes.array.isRequired,
}

const TabooListItem = ({ listItem }) => {
	return <StyledListItem>{listItem}</StyledListItem>
}

TabooListItem.propTypes = {
	listItem: PropTypes.any,
}

export const TabooCardTop = ({ tabooWord, margin = false }) => {
	return (
		<StyledTabooCard margin={margin}>
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
		</StyledTabooCard>
	)
}

TabooCardTop.propTypes = {
	tabooWord: PropTypes.string.isRequired,
	margin: PropTypes.bool
}
