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
import {ErrorMessage} from 'components/shared/FeedbackMessage'

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
export const ButtonTabooCard = ({ tabooWord, list, buttons, children, error }) => {
	return (
		<StyledTabooCard>
			<TabooWordContainer>{tabooWord}</TabooWordContainer>
			<TabooBody>
				{children ? children : <TabooList list={list} />}
				{error && <ErrorMessage error={error} />}
			</TabooBody>
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

//Used in TabooCard, ButtonTabooCard and FilteredListTabooCard
const TabooList = ({ list, property, specialValue, specialKey, secondary }) => {
	return (
		<List>
			{list.map((listItem, index) => {
				let displayText
				let includeStar = false
				if (typeof listItem === 'object' && listItem !== null && listItem[property]) {
					displayText = listItem[property]
					console.log(listItem[specialKey])
					console.log(specialValue)
					if (listItem[specialKey] && listItem[specialKey] === specialValue) {
						console.log(true)
						includeStar = true
					}
				} else {
					displayText = listItem
				}
				return (
					<TabooListItem listItem={displayText} key={index} includeStar={includeStar} secondary={secondary} />
				)
			})}
		</List>
	)
}

TabooList.propTypes = {
	list: PropTypes.array.isRequired,
	property: PropTypes.string,
	specialValue: PropTypes.string,
	specialKey: PropTypes.string,
	secondary: PropTypes.bool,
}

//exported for use in tests
export const TabooListItem = ({ listItem, includeStar, secondary }) => {
	//secondary styling and option to include Star
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
	includeStar: PropTypes.bool,
	secondary: PropTypes.bool,
}

export const TabooCardTop = ({ children, margin = false }) => {
	return (
		<StyledTabooCard margin={margin}>
			<TabooWordContainer>{children}</TabooWordContainer>
		</StyledTabooCard>
	)
}

TabooCardTop.propTypes = {
	// children: PropTypes.string.isRequired,
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
	noneMessage,
}) => {
	// console.log(unfilteredList)
	// console.log(filterKey)
	// console.log(filterValue)
	// console.log(displayProperty)
	// console.log(specialKey)
	// console.log(specialValue)

	//filters array based on match of item or item[filterKey] equal to filterValue
	const filteredList = unfilteredList.filter((item) => {
		//If item is an object, filter based on property  value. Otherwise filter based on value of item (i.e. string)
		if (typeof item === 'object' && item !== null) return item[filterKey] === filterValue
		return item === filterValue
	})

	//Displays List of filtered values based on the displayProperty
	return (
		<>
			<StyledListTitle>{listTitle}</StyledListTitle>
			{filteredList.length > 0 ? (
				<TabooList
					list={filteredList}
					property={displayProperty}
					specialKey={specialKey}
					specialValue={specialValue}
					secondary={true}
				/>
			) : (
				<TabooList list={[noneMessage]} secondary={true} />
			)}
		</>
	)
}
