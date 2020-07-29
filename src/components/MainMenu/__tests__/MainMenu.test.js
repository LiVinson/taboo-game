import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import MainMenu from '../MainMenu'
import { TabooCard } from 'components/shared/TabooCard'
import  TextLink from 'components/shared/TextLink'

//Need static router to prevent react-router errors due to <Link> in child component
it('Main menu renders correctly', () => {
	const props = {
		match: {
			path: '/home',
		},
	}

	const MainMenuComponent = renderer
		.create(
			<ThemeProvider theme={theme}>
				<MemoryRouter>
					<MainMenu {...props} />
				</MemoryRouter>
			</ThemeProvider>
		)
		.toJSON()

	expect(MainMenuComponent).toMatchSnapshot()
})

test('Main Menu renders TabooCard with 4 TextLink components', () => {
	const props = {
		match: {
			path: '/home',
		},
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<MemoryRouter>
				<MainMenu {...props} />
			</MemoryRouter>
		</ThemeProvider>
	)
	expect(wrapper.contains(TabooCard)).toEqual(true)
	expect(wrapper.find(TextLink)).toHaveLength(4)
})
