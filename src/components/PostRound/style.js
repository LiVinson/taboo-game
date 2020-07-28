import styled from 'styled-components'


export const PlayedCardList = styled.ul`
    list-style-type:none;
`

export const TabooWord = styled.li`
	display: flex;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid gray;
`

//hidden so only label displays. Selecting a label results in a style being applied
export const TabooRadio = styled.input`
	display: none;
	&:checked + label {
        background-color: ${props => props.theme.color.lightGray2};
        border: solid 1px ${props => props.theme.color.accent2}
	}
`

export const TabooLabel = styled.label`
	display: inline-block;
	font-size: 2rem;
	width: 100%;
	padding: 1rem 0rem;
`
