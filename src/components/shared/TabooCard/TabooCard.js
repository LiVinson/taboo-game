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
export const TabooCard = ({ type, tabooWord, list, children }) => {
	return (
		<StyledTabooCard type={type}>
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
			<TabooBody>{children ? children : <TabooList list={list} />}</TabooBody>
		</StyledTabooCard>
	)
}

TabooCard.propTypes = {
	type: PropTypes.string,
	tabooWord: PropTypes.string.isRequired,
	list: PropTypes.array,
	children: PropTypes.node,
}

//Same as TAbooCard, but includes 2 -3 buttons
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
	list: PropTypes.array,
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
