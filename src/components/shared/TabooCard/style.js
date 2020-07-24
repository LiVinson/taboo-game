import styled, { css } from 'styled-components'

export const StyledTabooCard = styled.div`
    width: 30rem;
    margin: 0 auto;
    margin-bottom: ${(props) => props.margin && '3rem'};
    padding: 2rem;
    border-radius: 2px;
    position: relative;
    /* z-index: 15; */
    background-color: currentColor;
    /* box-shadow: 0px 0.8rem 1rem rgba(0, 0, 0, 0.9); */
    color: ${(props) => props.theme.color.primary};


	&:before {
		z-index: -1;
		position: absolute;
		content: "";
		bottom: 1.2rem;
		left: .5rem;
		width: 50%;
		top: 80%;
		max-width:300px;
		background: #777;
		box-shadow: 0 1.5rem 1rem rgba(0,0,0,.4);
		transform: rotate(-3deg);
  
	}
    &:not(:first-child){
        margin-bottom:2rem;
    }
    
    ${(props) =>
		props.type === 'layer3' &&
		css`
			color: ${(props) => props.theme.color.secondary};
			position: absolute;
			top: 66%;
			left: 50%;
			z-index: -5;
			transform: translate(-50%, -50%) rotate(-20deg);
			box-shadow: 0px 0.2rem 0.4rem rgba(0, 0, 0, 0.3);

			&:before {
				display:none
			}
		`}

    ${(props) =>
		props.type === 'layer2' &&
		css`
			color: ${(props) => props.theme.color.primary2};
			position: absolute;
			top: 66%;
			left: 50%;
			z-index: -10;
			transform: translate(-50%, -50%) rotate(16deg);
			box-shadow: 0px 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
			&:before {
				display:none
			}
		`}

  ${(props) =>
		props.type === 'layer1' &&
		css`
			color: ${(props) => props.theme.color.tertiary};
			position: absolute;
			top: 66%;
			left: 50%;
			z-index: -15;
			transform: translate(-50%, -50%) rotate(-5deg);
			box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
			&:before {
				display:none
			}
		`}

`
StyledTabooCard.displayName = 'StyledTabooCard'

export const TabooWordContainer = styled.div`
	background-color: ${(props) => props.theme.color.offWhite};
	padding: 1.2rem;
	text-align: center;
	border-radius: 2px;
	font-family: ${(props) => props.theme.text.display};
	font-size: ${(props) => props.theme.fontSize.large};
	color: inherit;
	font-weight: 400;
	text-transform: uppercase;
`
TabooWordContainer.displayName = 'TabooWordContainer'

export const TabooBody = styled.div`
	background-color: ${(props) => props.theme.color.offWhite};
	padding: 1.5rem;
	text-align: center;
	border-radius: 2px;
	font-size: 4rem;
	margin-top: 1.5rem;
`
TabooBody.displayName = 'TabooBody'

export const StyledTabooList = styled.ul`
	list-style-type: none;
`
StyledTabooList.displayName = 'StyledTabooList'

export const StyledListItem = styled.li`
	font-family: ${(props) => props.theme.text.display};
	font-size: ${(props) => props.theme.fontSize.medium};
	position: relative;
	padding-bottom: 1.5rem;
`

StyledListItem.displayName = 'StyledListItem'
