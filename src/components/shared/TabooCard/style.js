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

    &:not(:first-child){
        margin-bottom:2rem;
    }
    
    ${(props) =>
    props.type === "layer3" &&
    css`
        color: ${(props) => props.theme.color.secondary};
        position: absolute;
        bottom: 11rem;
        left: 4rem;
        z-index: -5;
        transform: rotate(-20deg);
        box-shadow: 0px 0.6rem .8rem rgba(0, 0, 0, 0.7);

    `}

    ${(props) =>
    props.type === "layer2" &&
    css`
        color: ${(props) => props.theme.color.primary2};
        position: absolute;
        bottom: 10rem;
        left: 4rem;
        z-index: -10;
        transform: rotate(16deg);
        box-shadow: 0px 0.3rem .6rem rgba(0, 0, 0, 0.7);

    `}

  ${(props) =>
    props.type === "layer1" &&
    css`
      color: ${(props) => props.theme.color.tertiary};
      position: absolute;
      bottom: 9rem;
      right: 3rem;
      z-index: -15;
      transform: rotate(-5deg);
      box-shadow: 0px 0.1rem .3rem rgba(0, 0, 0, 0.7);

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