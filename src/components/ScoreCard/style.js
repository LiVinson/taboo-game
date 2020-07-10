import styled from "styled-components"

export const Scores = styled.ul`
  font-family: ${(props) => props.theme.text.display};
  list-style: none;
  font-size: 2rem;
  color:  ${(props) => props.theme.color.grayDark2};
  & > li:not(:last-child):after {
      display: block;
      content: "";
      width: 80%;
      height: 1.5px;
      background-color: ${(props) => props.theme.color.lightGray2};
      margin: 0.8rem auto 1rem auto;
    }
  }
`
