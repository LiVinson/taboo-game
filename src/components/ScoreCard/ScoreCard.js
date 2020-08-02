import React from 'react'
import PropTypes from "prop-types"
import { Scores, ScoreTitle, ScoreList, Score } from './style'

const ScoreCard = ({ teamScores }) => {
	return (
		<Scores>
			<ScoreTitle>Scores</ScoreTitle>
			<ScoreList>
				{teamScores.map((score, index) => (
					<Score key={index}>
						Team {index + 1}: <span>{score}</span>
					</Score>
				))}
			</ScoreList>
		</Scores>

	)
}

ScoreCard.propTypes = {
	teamScores: PropTypes.array.isRequired
}
export default ScoreCard
