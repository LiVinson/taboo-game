import React from 'react'
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'
import ScoreCard from 'components/ScoreCard'

/*
Information needed:
- Who is current player
- Who is the giver
- WHo is the watcher
- Who is giverTeam
- Who is watcherTeam
- Time remaining
- Skip handler
- Next handler
- Buzzer Handler
- timeup callback

*/
const InRound = ({ giver, watcher }) => {
	console.log(giver, watcher)
	const role = 'watcherTeam'
	return (
		<React.Fragment>
			<ScoreCard teamScores={[2, 3]} />

			<TimeCard timeRemaining={'2:00'} timeUp={() => console.log('time up')} />
			{role === 'giver' && <GiverGameCard />}
			{role === 'watcher' && <WatcherGameCard />}
			{(role === 'giverTeam' || role === 'watcherTeam') && (
				<TeamGameCard role={role} giver={giver} watcher={watcher} />
			)}
		</React.Fragment>
	)
}

export default InRound
