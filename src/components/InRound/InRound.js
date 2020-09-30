import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import TimeCard from 'components/TimeCard'
import LoadingCard from 'components/shared/LoadingCard'
import { ErrorCard } from 'components/shared/ErrorCard'
import { GameCard } from 'components/GameCard'
import { changeCardStatus } from 'store/actions/cardActions'

// export const InRound = ({ roundEndTime, endRound, role, error, ...props }) => {
export class InRound extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			displayCardsRemaining: false,
		}
	}

	componentDidMount() {
		this.checkCardsRemaining()
	}

	componentDidUpdate(prevProps) {
		//If game is set to end and not previously called, call endRound
		if (prevProps.allCardsPlayed !== this.props.allCardsPlayed && this.props.allCardsPlayed) {
			this.props.endRound()
			//If the card index has changed, check if getting down to last cards
		} else if (prevProps.cardIndex !== this.props.cardIndex) {
			this.checkCardsRemaining()
		}
	}

	checkCardsRemaining = () => {
		const cardsRemaining = this.props.lastCardIndex - this.props.cardIndex
		if ((cardsRemaining === 20 || cardsRemaining === 5) && !this.state.displayCardsRemaining) {
			this.toggleCardsRemaining()
		} else if (cardsRemaining <= -1) {
			this.props.endGame()
		}
	}
	//change display status. If changing to true, call function to change back after a few seconds
	toggleCardsRemaining = () => {
		this.setState(
			{
				displayCardsRemaining: !this.state.displayCardsRemaining,
			},
			() => {
				if (this.state.displayCardsRemaining) {
					this.removeCardsRemaining()
				}
			}
		)
	}

	//Sets display cards false after a few seconds
	removeCardsRemaining = () => {
		this.timeOutId = setTimeout(() => {
			if (this.state.displayCardsRemaining) {
				this.toggleCardsRemaining()
			}
		}, 6000)
	}

	componentWillUnmount() {
		if (this.timeOutId) {
			clearTimeout(this.timeOutId)
		}
	}
	render() {
		const {
			giver,
			watcher,
			role,
			roundEndTime,
			currentCard,
			cardIndex,
			lastCardIndex,
			endRound,
			isPending,
			error,
			changeCardStatus,
		} = this.props
		const cardsRemainingMsg = this.state.displayCardsRemaining
			? `Only ${lastCardIndex - cardIndex} cards remaining!`
			: ''
		return (
			<React.Fragment>
				<TimeCard roundEndTime={roundEndTime} endRound={endRound} role={role} />
				{/*Render GameCard as long as current time is before round ends other wise check for error and render. If no error, display Loading until round status changes*/}
				{moment().isBefore(roundEndTime, 'second') ? (
					<GameCard
						giver={giver}
						watcher={watcher}
						role={role}
						currentCard={currentCard}
						isPending={isPending}
						changeCardStatus={changeCardStatus}
						cardsRemainingMsg={cardsRemainingMsg}
						error={error.cardError}
					/>
				) : error.roundError ? (
					<ErrorCard error={error.roundError} />
				) : (
					<LoadingCard message="Checking cards played" />
				)}
			</React.Fragment>
		)
	}
}

InRound.propTypes = {
	gamecode: PropTypes.string.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	role: PropTypes.string.isRequired,
	round: PropTypes.number.isRequired,
	roundEndTime: PropTypes.number.isRequired,
	currentCard: PropTypes.object.isRequired,
	cardIndex: PropTypes.number.isRequired,
	lastCardIndex: PropTypes.number.isRequired,
	allCardsPlayed: PropTypes.bool.isRequired,
	endRound: PropTypes.func.isRequired,
	isPending: PropTypes.bool.isRequired,
	error: PropTypes.object.isRequired,
	changeCardStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		isPending: state.cards.pending,
		error: {
			cardError: state.cards.error && state.cards.error.errorMessage,
			roundError: state.round.error && state.round.error.errorMessage,
		},
	}
}

const mapDispatchToProps = (dispatch, prevProps) => {
	//The index of the currently displayed card, current round and gamecode
	const { cardIndex, gamecode, round, giver } = prevProps
	const half = giver.team === 'team 1' ? 'top' : 'bottom'
	return {
		changeCardStatus: (cardStatus) =>
			dispatch(changeCardStatus(gamecode, cardStatus, cardIndex, 'in progress', round, half)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InRound)
