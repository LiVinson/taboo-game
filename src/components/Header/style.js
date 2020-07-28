import styled, { css } from 'styled-components'

export const StyledHeader = styled.header`
	margin-top: ${(props) => (props.large ? '3rem' : '2rem')};
	margin-bottom: ${(props) => (props.subheading ? '5rem' : '3rem')};
`

export const Title = styled.h1`
	background: none;
	font-family: ${(props) => props.theme.text.display};
	font-size: ${(props) => props.theme.fontSize.medium};
	color: ${(props) => props.theme.color.primary};
	text-transform: uppercase;
  font-weight: 300;

	${(props) =>
		props.large &&
		css`
			font-size: ${(props) => props.theme.fontSize.xlarge};
			text-align: center;
			margin: 1rem 0;
		`}
`
Title.displayName = 'Title'

export const Subheading = styled.h3`
  font-size: 2.4rem;
  text-align: center;
  width: 30rem;
  margin: 0 auto;
  font-weight: 300;
  color: ${(props) => props.theme.color.grayDark1};
  background-color: rgba(247, 249, 249, .5);
  line-height:1.3;
  
`
Subheading.displayName = 'Subbeading'

export const FocusSpan = styled.span`
	color: ${(props) => props.theme.color.primary};

`
FocusSpan.displayName = 'FocusSpan'
