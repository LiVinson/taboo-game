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

export const completeGame = {
	endGameMethod: 'turns',
	endValue: 2,
	gamecode: [gamecode],
	skipPenalty: 'half',
	status: 'completed',
	players,
	gameplay: {
		half: 'bottom',
		round: 4,
		score: {
			team1: 8,
			team2: 10,
		},
		status: 'preround',
		team1Rotations: 2,
		team2Rotations: 2,
		team1Turn: 0,
		team2Turn: 0,
	},
}