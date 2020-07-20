import { TabooCard } from 'components/shared/TabooCard'
import React from 'react'

export default function LayeredCards() {
	return (
		<React.Fragment>
			<TabooCard type="layer1"tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />
			<TabooCard type="layer2" tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />
      <TabooCard type="layer3" tabooWord="Taboo!" list={['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!']} />

      </React.Fragment>
	)
}
