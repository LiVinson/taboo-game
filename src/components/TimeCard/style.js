import styled from 'styled-components'

export const ProgressBar = styled.div`
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
	background-color: ${(props) =>
		parseInt(props.width) > 16 ? props.theme.color.accent3 : props.theme.color.accent2};
	height: 100%;
	z-index: 2;
`
export const TimeText = styled.div`
	/* positions numbers to the far right */
	position: absolute;
    right: ${(props) => (parseInt(props.width) > 0 ? 0 : '50%')};
    /* when time = 0, centers time up message */
	transform: ${(props) => {
		if (parseInt(props.width) > 0) {
			return 'translateX(0)'
		} else {
			return 'translateX(50%)'
		}
	}};
	padding: 0 0.5rem;
	height: 100%;
	font-size: 1.8rem;
	z-index: 5;
	color: ${(props) => props.theme.color.lightGray1};
`
