import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'

import theme from '../../../global-design/theme'
import Header from '../Header'
import { Title, Subheading } from 'components/Header/style.js'

//--------------Header--------------------
test('Header renders correctly on /home route', () => {
	const props = {
		location: {
			pathname: '/home',
		},
	}
	//Requires TP due to nested components accessing theme prop
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<Header theme={theme} {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('Header renders correctly on nested home route', () => {
	const props = {
		location: {
			pathname: '/home/create',
		},
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<Header theme={theme} {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('Header renders correctly when not on home route', () => {
	const props = {
		location: {
			pathname: '/play/90210/12345',
		},
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<Header theme={theme} {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

//Title
test('Title renders the larger centered title when large prop is true', () => {
	const props = {
		large: true,
	}
	const wrapper = shallow(<Title {...props} theme={theme} />)
	expect(wrapper).toHaveStyleRule('font-size', '7rem')
	expect(wrapper).toHaveStyleRule('text-align', 'center')
})

test('Title renders the smaller title when large is small', () => {
	const props = {
		large: false,
	}
	const wrapper = shallow(<Title {...props} theme={theme} />)
	expect(wrapper).toHaveStyleRule('font-size', '2.7rem')
})

//-------------- Subheading --------------------
test('Subheading renders correctly', () => {
	const wrapper = renderer.create(<Subheading theme={theme} />).toJSON()
	expect(wrapper).toMatchSnapshot()
})
