import {players} from './players'

export const gamecode = '90210'

export const game = {
	endGameMethod: 'turns',
	endValue: 2,
	gamecode: [gamecode],
	skipPenalty: 'half',
	status: 'in progress',
	players,
	gameplay: {
		half: 'top',
		round: 1,
		score: {
			team1: 0,
			team2: 0,
		},
		status: 'preround',
		team1Rotations: 0,
		team2Rotations: 0,
		team1Turn: 0,
		team2Turn: 0,
	},
}
