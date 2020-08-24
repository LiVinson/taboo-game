import styled from "styled-components"
import { ReactComponent as Star } from './star-full.svg';

export const StyledStar = styled(Star)`
  fill: ${(props) => props.theme.color.primary};
  height: 2rem;
  width:2rem;
  margin-left:.5rem;
`