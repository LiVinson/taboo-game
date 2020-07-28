import styled from "styled-components"

export const InstructionsText = styled.p`
    font-size:2rem;
    color: ${props => props.theme.color.grayDark2};
    text-align:left;
    &:not(:last-child){
        margin-bottom:1rem;
    }
`

export const KeyWord = styled.span`
    color: ${props => props.theme.color.accent2};

`