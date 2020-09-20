import React from 'react'
import { shallow } from 'enzyme'
import PostRoundNonWatcher from 'components/PostRoundNonWatcher'
import { TabooCard } from 'components/shared/TabooCard'

describe('PostRoundNonWatcher', () => {
	const paragraph = <p>Here is a list</p>
	test('Renders a TabooCard ', () => {
		const component = shallow(<PostRoundNonWatcher>{paragraph}</PostRoundNonWatcher>)
		expect(component.find(TabooCard)).toHaveLength(1)
	})
})
