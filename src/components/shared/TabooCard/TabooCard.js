import React from "react"
import PropTypes from "prop-types"
import {
  StyledTabooCard,
  TabooWordContainer,
  TabooBody,
  StyledTabooList,
  StyledListItem,
} from "./style"
import ButtonContainer from "components/ButtonContainer"

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
  children: PropTypes.node
}

export const ButtonTabooCard = ({tabooWord, list, buttons, children}) => {
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
  children: PropTypes.node
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

export const TabooCardTop = ({ tabooWord, margin=false }) => {
  return (
    <StyledTabooCard margin={margin} >
      <TabooWordContainer>{tabooWord}</TabooWordContainer>
    </StyledTabooCard>
  )
}

