import styled, { css } from 'styled-components'

//Primary Taboo Card container
export const StyledTabooCard = styled.div`
	width: 30rem;
	margin: 0 auto;
	margin-bottom: ${(props) => props.margin && '3rem'};
	padding: 2rem;
	border-radius: 2px;
	position: relative;
	background-color: currentColor;
	color: ${(props) => props.theme.color.primary};

	/* Creates a box shadow on bottom left corner of card  */
	&:before {
		z-index: -1;
		position: absolute;
		content: '';
		bottom: 1.2rem;
		left: 0.5rem;
		width: 50%;
		top: 80%;
		max-width: 300px;
		background: #777;
		box-shadow: 0 1.5rem 1rem rgba(0, 0, 0, 0.4);
		transform: rotate(-3deg);
	}
`

StyledTabooCard.displayName = 'StyledTabooCard'

//Creates the "stacked" background element. Color and z-index varies based on level in stack.
export const StyledLayeredTabooCard = styled(StyledTabooCard)`
	position: absolute;
	top: 66%;
	left: 50%;
	margin-bottom: 0rem;
	${({ layer }) =>
		layer === 'top' &&
		css`
			color: ${(props) => props.theme.color.accent2};
			z-index: -5;
			transform: translate(-50%, -50%) rotate(-20deg);
		`}

		${({ layer }) =>
			layer === 'middle' &&
			css`
				color: ${(props) => props.theme.color.accent1};
				z-index: -10;
				transform: translate(-50%, -50%) rotate(16deg);
			`}

		${({ layer }) =>
			layer === 'bottom' &&
			css`
				color: ${(props) => props.theme.color.accent3};
				z-index: -15;
				transform: translate(-50%, -50%) rotate(-5deg);
			`}
	/* Removes the box shadow from left corner from standard taboo card */
	&:before {
		display: none;
	}
	/* Creates an overlay on the card so the colors are muted and appears more in the background */
	&:after {
		display: inline-block;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: lightgray;
		opacity: 0.5;
	}
 `

StyledLayeredTabooCard.displayName = 'StyledLayeredTabooCard'

// Used for top portion of taboo card that contains word to guess
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

//Bottom portion of Taboo card. Contains list of taboo words or whatever was passed in as children
export const TabooBody = styled.div`
	background-color: ${(props) => props.theme.color.offWhite};
	padding: 1.5rem;
	text-align: center;
	border-radius: 2px;
	font-size: 4rem;
	margin-top: 1.5rem;
`
TabooBody.displayName = 'TabooBody'

export const StyledListItem = styled.li`
	font-family: ${(props) => props.theme.text.display};
	font-size: ${(props) => props.theme.fontSize.medium};
	position: relative;
	padding-bottom: 1.5rem;
`

StyledListItem.displayName = 'StyledListItem'

export const StyledListItemSecondary = styled.li`
	color: ${(props) => props.theme.color.grayDark2};
	font-size: 2.2rem;
`
export const StyledListTitle = styled.p`
	text-transform: uppercase;
	color: ${(props) => props.theme.color.grayDark2};
	font-size: 2.5rem;
	margin-bottom: 0.3rem;
	font-family: ${(props) => props.theme.text.display};

	/* Faint gray line after section title*/
	&::after {
		display: block;
		content: '';
		width: 80%;
		height: 1.5px;
		background-color: ${(props) => props.theme.color.lightGray2};
		margin: 0.8rem auto 0.6rem auto;
	}

	
	&:not(:first-child) {
    margin-top:1rem;
  }
`
