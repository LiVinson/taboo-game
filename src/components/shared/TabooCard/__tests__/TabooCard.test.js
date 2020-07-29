import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import { TabooCard, ButtonTabooCard, LayeredTabooCard, TabooCardTop } from '../TabooCard'
import ButtonContainer from 'components/ButtonContainer'

// ------------------- Main Taboo Card--------------------
test('TabooCard renders correctly when list is passed ', () => {
	const props = {
		type: 'home',
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
	}
	// requires TP due to nested components using theme prop
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<TabooCard {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('TabooCard renders children prop', () => {
	const h1 = <h1>I am a child property</h1>
	const props = {
		tabooWord: 'taboo',
		children: h1,
	}

	const wrapper = shallow(<TabooCard {...props} />)
	expect(wrapper.contains(<h1>I am a child property</h1>)).toEqual(true)
})

test('TabooCard renders list prop if children prop is not passed', () => {
	const props = {
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<TabooCard {...props} />
		</ThemeProvider>
	)
	expect(wrapper.find('ul').children()).toHaveLength(props.list.length)
})

// ------------------- Button Taboo Card--------------------

test('ButtonTabooCard renders ButtonContainer', () => {
	const props = {
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
		buttons: [
			{ text: 'Back', handleClick: jest.fn() },
			{ text: 'Next', handleClick: jest.fn() },
		],
	}
	const wrapper = shallow(<ButtonTabooCard {...props} />)
	expect(wrapper.find(ButtonContainer)).toHaveLength(1)
})

test('ButtonTabooCard renders correctly when list is provided', () => {
	const props = {
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
		buttons: [
			{ text: 'Back', handleClick: jest.fn() },
			{ text: 'Next', handleClick: jest.fn() },
		],
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<ButtonTabooCard {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('ButtonTabooCard renders children prop if provided', () => {
	const h1 = <h1>I am a child property</h1>
	const props = {
		tabooWord: 'taboo',
		children: h1,
		buttons: [
			{ text: 'Back', handleClick: jest.fn() },
			{ text: 'Next', handleClick: jest.fn() },
		],
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<ButtonTabooCard {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

// ------------------- Layered Taboo Card--------------------

test('LayeredTabooCard renders correctly', () => {
	const props = {
		tabooWord: 'Taboo!',
		list: ['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!'],
		layer: 'top',
	}

	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<LayeredTabooCard {...props} />
			</ThemeProvider>
		)
		.toJSON()

	expect(wrapper).toMatchSnapshot()
})

test('Top LayeredTabooCard has correct styles', () => {
	const props = {
		tabooWord: 'Taboo!',
		list: ['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!'],
		layer: 'top',
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<LayeredTabooCard {...props} />
		</ThemeProvider>
	)

	expect(wrapper).toHaveStyleRule('position', 'absolute')
	expect(wrapper).toHaveStyleRule('z-index', '-5')
	expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(-20deg)')
	expect(wrapper).toHaveStyleRule('color', theme.color.accent2)
})

test('Middle LayeredTabooCard has correct styles', () => {
	const props = {
		tabooWord: 'Taboo!',
		list: ['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!'],
		layer: 'middle',
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<LayeredTabooCard {...props} />
		</ThemeProvider>
	)
	expect(wrapper).toHaveStyleRule('position', 'absolute')
	expect(wrapper).toHaveStyleRule('z-index', '-10')
	expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(16deg)')
	expect(wrapper).toHaveStyleRule('color', theme.color.accent1)
})

test('Bottom LayeredTabooCard has correct styles', () => {
	const props = {
		tabooWord: 'Taboo!',
		list: ['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!'],
		layer: 'bottom',
	}

	const wrapper = mount(
		<ThemeProvider theme={theme}>
			<LayeredTabooCard {...props} />
		</ThemeProvider>
	)
	expect(wrapper).toHaveStyleRule('position', 'absolute')
	expect(wrapper).toHaveStyleRule('z-index', '-15')
	expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(-5deg)')
	expect(wrapper).toHaveStyleRule('color', theme.color.accent3)
})

// ------------------- Taboo Card Top --------------------

test('TabooCardTop renders correctly', () => {
  const props = {
		tabooWord: 'Taboo!'
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<TabooCardTop {...props}/>
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})
