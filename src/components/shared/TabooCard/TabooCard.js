import React from 'react'
import PropTypes from 'prop-types'
import {
	StyledTabooCard,
	StyledLayeredTabooCard,
	TabooWordContainer,
	TabooBody,
	StyledListItem,
	StyledListItemSecondary,
	StyledListTitle,
} from './style'
import List from 'components/shared/List'
import ButtonContainer from 'components/ButtonContainer'
import Star from 'components/shared/Star'

//Primary TabooCard component used for main menu and game
export const TabooCard = ({ tabooWord, list, children }) => {
	return (
		<StyledTabooCard>
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
	layer: PropTypes.string.isRequired,
}

const TabooList = ({ list, property, specialValue, specialKey, secondary }) => {
	return (
		<List>
			{list.map((listItem, index) => {
				let displayText
				let includeStar = false
				if (typeof listItem === 'object' && listItem !== null && listItem[property]) {
					displayText = listItem[property]
					if (listItem[specialKey] && listItem[specialKey] === specialValue) {
						includeStar = true
					}
				} else {
					displayText = listItem
				}
				return <TabooListItem listItem={displayText} key={index} includeStar={includeStar} secondary={secondary}  />
			})}
		</List>
	)
}

TabooList.propTypes = {
	list: PropTypes.array.isRequired,
}

const TabooListItem = ({ listItem, includeStar, secondary }) => {
	return secondary ? (
		<StyledListItemSecondary>
			{listItem}
			{includeStar && <Star />}
		</StyledListItemSecondary>
	) : (
		<StyledListItem>{listItem}</StyledListItem>
	)
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
	margin: PropTypes.bool,
}
//ex: playerList array of player objects need to be filtered by team: playerList, team, team1, name, Players, [{}]
export const FilteredTabooList = ({
	unfilteredList,
	listTitle,
	filterKey,
	filterValue,
	displayProperty,
	specialKey,
	specialValue,
	noneMessage
}) => {
	console.log(unfilteredList)
	console.log(filterKey)
	console.log(filterValue)
	console.log(displayProperty)
	console.log(specialKey)
	console.log(specialValue)

	//filters array based on match of item or item[filterKey] equal to filterValue
	const filteredList = unfilteredList.filter((item) => {
		//If item is an object, filter based on property  value. Otherwise filter based on value of item (i.e. string)
		if (typeof item === 'object' && item !== null) return item[filterKey] === filterValue
		return item === filterValue
	})
	console.log(filteredList)

	/*
		Determine how to account for 'special' values in list getting a star (e.g. if player in list = current player)
	*/

	//Displays List of filtered values based on the displayProperty
	return (
		<>
			<StyledListTitle>{listTitle}</StyledListTitle>
			{filteredList.length > 0 
				
				? 
			<TabooList
				list={filteredList}
				property={displayProperty}
				specialKey={specialKey}
				specialValue={specialValue}
				secondary={true}
			/> : <TabooList list={[noneMessage]} secondary={true}/>}
		</>
	)
}
