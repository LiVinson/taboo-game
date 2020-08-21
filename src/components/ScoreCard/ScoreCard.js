import React from 'react'
import PropTypes from "prop-types"
import { Scores, ScoreTitle, Score } from './style'
import  List  from 'components/shared/List'

const ScoreCard = ({ teamScores }) => {
	return (
		<Scores>
			<ScoreTitle>Scores</ScoreTitle>
			<List>
				{teamScores.map((score, index) => (
					<Score key={index}>
						Team {index + 1}: <span>{score}</span>
					</Score>
				))}
			</List>
		</Scores>

	)
}

ScoreCard.propTypes = {
	teamScores: PropTypes.array.isRequired
}
export default ScoreCard
