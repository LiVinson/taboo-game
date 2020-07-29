import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import LayeredCards from '../LayeredCards'
import { LayeredTabooCard } from 'components/shared/TabooCard'


test('Layered cards renders correctly', () => {
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<LayeredCards />
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})

test('Contains three LayeredTabooCard components', () => {
	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<LayeredCards />
		</ThemeProvider>
	)

	expect(wrapper.find(LayeredTabooCard)).toHaveLength(3)
})
