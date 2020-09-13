import React from 'react'
import PropTypes from 'prop-types'
import RoundInstructionsCard from 'components/RoundInstructionsCard'
import ScoreCard from 'components/ScoreCard'

const PreRound = ({ teamScores, ...rest }) => {
	return (
		<React.Fragment>
			<ScoreCard teamScores={Object.values(teamScores)} />
			<RoundInstructionsCard {...rest} />
			{/* {error ? <ErrorMessage error={error} /> : null}*/}
		</React.Fragment>
	)
}

PreRound.propTypes = {
	teamScores: PropTypes.object.isRequired,
	currentPlayer: PropTypes.object.isRequired,
	role: PropTypes.string.isRequired,
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	startRound: PropTypes.func.isRequired,
}

export default PreRound
