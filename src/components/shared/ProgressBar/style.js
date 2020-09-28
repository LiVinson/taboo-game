import styled from 'styled-components'

//Container for the progress bar. Will be the background as the width of the inner bar decreases
export const StyledProgressBar = styled.div`
	width: 100%;
	position: relative;
	background-color: ${(props) => props.theme.color.grayDark1};
	height: 3rem;
	margin-bottom: 1rem;
	border-radius: 3px;
	border: solid 2px ${(props) => props.theme.color.grayDark2};
	box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: space-between;
`

//Serves as the progress bar. Width is based on a percentage of time remaining / 60 seconds
export const Bar = styled.div`
	/* allows the color bar to overlap the numbers */
	position: absolute;
	top: 0;
	left: 0;
	width: ${(props) => props.width + '%'};
	/* If width is less than 16 (equivalent of 10 seconds on a minute timer) or less remaining: change color */
	background-color: ${(props) =>
		parseInt(props.width) > 16 ? props.theme.color.accent3 : props.theme.color.accent2};
	height: 100%;
	z-index: 2;
`
