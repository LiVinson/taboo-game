import styled, { css } from "styled-components"


export const StyledTabooCard = styled.div`
    width: 30rem;
    margin: 0 auto;
    margin-bottom: ${props => props.margin && "3rem"};
    padding: 2rem;
    border-radius: 2px;
    position: relative;
    z-index: 15;
    background-color: currentColor;
    box-shadow: 0px 0.8rem 1rem rgba(0, 0, 0, 0.9);
    color: ${(props) => props.theme.color.primary};

    ${(props) =>
    props.type === "middle" &&
    css`
        color: ${(props) => props.theme.color.secondary};;
        position: absolute;
        bottom: 8rem;
        left: 7rem;
        z-index: 10;
        transform: rotate(42deg);
    `}

  ${(props) =>
    props.type === "bottom" &&
    css`
      color: var(--color-tertiary);
      position: absolute;
      bottom: 9rem;
      right: 8rem;
      z-index: 5;
      transform: rotate(-42deg);
    `}

`
StyledTabooCard.displayName = "StyledTabooCard"

export const TabooWordContainer = styled.div`
    background-color: ${(props) => props.theme.color.offWhite};
    padding: 1.2rem;
    text-align: center;
   
    border-radius: 2px;
    font-family: ${(props) => props.theme.text.display};
    font-size: ${(props) => props.theme.fontSize.large};
    color: inherit;
    font-weight: 600;
    text-transform: uppercase;
`
TabooWordContainer.displayName = "TabooWordContainer"

export const TabooBody = styled.div`
    background-color: ${(props) => props.theme.color.offWhite};
    padding: 1.5rem;
    text-align: center;
    border-radius: 2px;
    font-size: 4rem;
    margin-top: 1.5rem;
`
TabooBody.displayName = "TabooBody"

export const StyledTabooList = styled.ul`
    list-style-type: none;
`
StyledTabooList.displayName = "StyledTabooList"

export const StyledListItem = styled.li`
    font-family: ${(props) => props.theme.text.display};
    font-size: ${(props) => props.theme.fontSize.medium};
    position: relative;
    padding-bottom: 1.5rem;
`

StyledListItem.displayName = "StyledListItem"