import { LayeredTabooCard } from 'components/shared/TabooCard'
import React from 'react'

const LayeredCards = () => {
	return (
		<React.Fragment>
			<LayeredTabooCard layer="top" tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />
			<LayeredTabooCard layer="middle" tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />
			<LayeredTabooCard layer="bottom" tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />
		</React.Fragment>
	)
}

export default LayeredCards
