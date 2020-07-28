import styled from 'styled-components'

export const ProgressBar = styled.div`
    width: 100%;
    background-color: darkgray;
    height: 3rem;
    margin-bottom:1rem;
    border-radius: 3px;
    border: solid 2px ${props => props.theme.color.grayDark2};
    box-shadow: 0px 3px 2px rgba(0,0,0, .3);
`

export const Bar = styled.div`
    width: ${props => props.width};
    background-color: ${props => props.theme.color.accent3};
    height: 100%;
`
