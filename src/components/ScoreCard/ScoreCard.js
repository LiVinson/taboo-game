import React from 'react'
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

export default ScoreCard
