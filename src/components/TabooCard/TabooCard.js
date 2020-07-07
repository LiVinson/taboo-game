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

const TabooCard = ({ type, tabooWord, list, buttons, children }) => {
  return (
    <StyledTabooCard type={type}>
      <TabooWordContainer>{tabooWord}</TabooWordContainer>
      <TabooBody>{children ? children : <TabooList list={list} />}</TabooBody>
      {buttons && <ButtonContainer buttons={buttons} />}
    </StyledTabooCard>
  )
}

TabooCard.propTypes = {
  type: PropTypes.string,
  tabooWord: PropTypes.string.isRequired,
  list: PropTypes.array,
  buttons: PropTypes.arrayOf(PropTypes.object),
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
export default TabooCard
