import React from 'react'
import PropTypes from "prop-types"
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'

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
const InRound = ({ giver, watcher, role = 'watcherTeam' }) => {
	console.log(giver, watcher)
	console.log(role)
	return (
		<React.Fragment>
			<TimeCard timeRemaining={'2:00'} timeUp={() => console.log('time up')} />
			{role === 'giver' && <GiverGameCard />}
			{role === 'watcher' && <WatcherGameCard />}
			{(role === 'giverTeam' || role === 'watcherTeam') && (
				<TeamGameCard role={role} giver={giver} watcher={watcher} />
			)}
		</React.Fragment>
	)
}

InRound.propTypes = {
	giver: PropTypes.object.isRequired,
	watcher: PropTypes.object.isRequired,
	role: PropTypes.string
}
export default InRound
