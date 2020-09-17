import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import Home from '../Home'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'

describe('Home component renders correctly on each subroute', () => {
	const defaultProps = {
		match: {
			path: '/home',
		},
	}

	test('Home renders correctly on /home route', () => {
		const props = {
			...defaultProps
		}
		/* component contains switch, so MR required*/
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<Home {...props} />
					</MemoryRouter>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Home renders correctly on /home/create route', () => {
		const props = {
			...defaultProps,
			match: {
				props: "/home/create"
			}
		}
		/* component contains switch, so MR required*/
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<Home {...props} />
					</MemoryRouter>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Home renders correctly on /home/join route', () => {
		const props = {
			...defaultProps,
			match: {
				props: "/home/join"
			}
		}
		/* component contains switch, so MR required*/
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<Home {...props} />
					</MemoryRouter>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Home renders correctly on /home/rules route', () => {
		const props = {
			...defaultProps,
			match: {
				props: "/home/rules"
			}
		}
		/* component contains switch, so MR required*/
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<MemoryRouter>
						<Home {...props} />
					</MemoryRouter>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})
})
