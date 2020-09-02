import styled from 'styled-components'

//Adds margin to each card component & button in the entire page, except the last one.
export const StyledPostRound = styled.div`
	& > *:not(:last-child){
		margin-bottom: 2rem;
	}
`


