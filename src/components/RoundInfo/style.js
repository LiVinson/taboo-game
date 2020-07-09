import styled from "styled-components"

export const StyledRoundInfo = styled.div`
    margin-bottom:1rem;
    width:100%;
    max-width: 40rem;
    display:flex;
    flex-wrap:wrap;
    text-align:center;
    justify-content:space-around;
    margin: 0 auto 1rem auto;
    
`
export const RoundData = styled.p`
    font-size: 2rem;
    font-family: ${props => props.theme.text.display};
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
    /* Used to set round # to full width while others are dynamic through flex */
    width: ${props => props.width && props.width};
    
    & span {
        color: ${props => props.theme.color.grayDark2};
    }
`
RoundData.displayName = "RoundData"