import styled from "styled-components"
import { ReactComponent as Star } from './star-full.svg';

export const StyledTeamList = styled.div`
  &:not(:first-child) {
    margin-top: 1rem;
  }
`
export const PlayerTitle = styled.p`
  color: ${(props) => props.theme.color.grayDark2};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: ${(props) => props.theme.text.display};

  /* Faint gray line after section title*/
  &::after {
    display: block;
    content: "";
    width: 80%;
    height: 1.5px;
    background-color: ${(props) => props.theme.color.lightGray2};
    margin: 0.8rem auto 0.6rem auto;
  }

`

export const PlayerList = styled.ul`
  color: ${(props) => props.theme.color.grayDark2};
  list-style: none;
  font-size: 2.2rem;
`
export const Player = styled.li`
  margin-bottom: 0.5rem;

`

export const StyledStar = styled(Star)`
  fill: ${(props) => props.theme.color.primary};
  height: 2rem;
  width:2rem;
`