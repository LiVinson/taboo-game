import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../../global-design/theme'
import {
	TabooCard,
	ButtonTabooCard,
	LayeredTabooCard,
	TabooCardTop,
	TabooWordContainer,
	TabooList,
	TabooListItem,
	TabooBody,
	FilteredTabooList,
} from '../TabooCard'
import ButtonContainer from 'components/ButtonContainer'

describe('TabooCard renders and functions correctly', () => {
	const defaultProps = {
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
	}

	// ------------------- Main Taboo Card--------------------
	test('TabooCard renders correctly when list is passed ', () => {
		const props = {
			...defaultProps,
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
			...defaultProps,
			list: null,
			children: h1,
		}

		const wrapper = shallow(<TabooCard {...props} />)
		expect(wrapper.contains(<h1>I am a child property</h1>)).toEqual(true)
	})
})
// ------------------- Button Taboo Card--------------------

describe('ButtonTabooCard renders correctly', () => {
	const defaultProps = {
		tabooWord: 'taboo',
		list: ['word1', 'word2', 'word3'],
		buttons: [
			{ text: 'Back', onClick: jest.fn() },
			{ text: 'Next', onClick: jest.fn() },
		],
	}

	test('ButtonTabooCard renders ButtonContainer', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<ButtonTabooCard {...props} />)
		expect(wrapper.find(ButtonContainer)).toHaveLength(1)
	})

	test('ButtonTabooCard renders correctly when list is provided', () => {
		const props = {
			...defaultProps,
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
			...defaultProps,
			list: null,
			children: h1,
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
})

// ------------------- Layered Taboo Card--------------------

describe('Layered TabooCard renders correctly', () => {
	const defaultProps = {
		tabooWord: 'taboo',
		list: ['Taboo!', 'Taboo!', 'Taboo!', 'Taboo!', 'Taboo!'],
		layer: 'top',
	}

	test('Top LayeredTabooCard renders correctly', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<LayeredTabooCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()

		expect(wrapper).toHaveStyleRule('position', 'absolute')
		expect(wrapper).toHaveStyleRule('z-index', '-5')
		expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(-20deg)')
		expect(wrapper).toHaveStyleRule('color', theme.color.accent2)
	})

	test('Middle LayeredTabooCard renders correctly', () => {
		const props = {
			...defaultProps,
			layer: 'middle',
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<LayeredTabooCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
		expect(wrapper).toHaveStyleRule('position', 'absolute')
		expect(wrapper).toHaveStyleRule('z-index', '-10')
		expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(16deg)')
		expect(wrapper).toHaveStyleRule('color', theme.color.accent1)
	})

	test('Bottom LayeredTabooCard has correct styles', () => {
		const props = {
			...defaultProps,
			layer: 'bottom',
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<LayeredTabooCard {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
		expect(wrapper).toHaveStyleRule('position', 'absolute')
		expect(wrapper).toHaveStyleRule('z-index', '-15')
		expect(wrapper).toHaveStyleRule('transform', 'translate(-50%,-50%) rotate(-5deg)')
		expect(wrapper).toHaveStyleRule('color', theme.color.accent3)
	})
})

// ------------------- Taboo Card Top --------------------

test('TabooCardTop renders correctly', () => {
	const props = {
		tabooWord: 'Taboo!',
	}
	const wrapper = renderer
		.create(
			<ThemeProvider theme={theme}>
				<TabooCardTop {...props} />
			</ThemeProvider>
		)
		.toJSON()
	expect(wrapper).toMatchSnapshot()
})

// ------------------- FilteredTabooList --------------------
describe('FilteredTabooList renders correctly', () => {
	const unfilteredList = [
		{ name: 'Player 1', team: 'team 1', playerId: '12345' },
		{ name: 'Player 2', team: 'team 1', playerId: '23456' },
		{ name: 'Player 3', team: 'unassigned', playerId: '34567' },
		{ name: 'Player 4', team: 'unassigned', playerId: '45678' },
	]
	let filterValue = 'team 1'
	const noneMessage = `No ${filterValue} players`

	const defaultProps = {
		unfilteredList,
		filterKey: 'team',
		filterValue,
		displayProperty: 'name',
		listTitle: 'team 1',
		noneMessage,
	}

	test('FilterTabooList only lists values based on filterKey and filterValue', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<FilteredTabooList {...props} />
			</ThemeProvider>
		)
		
		expect(wrapper.find(TabooListItem).length).toBe(2)
		expect(wrapper.find(TabooListItem).at(0).text()).toEqual("Player 1")
		expect(wrapper.find(TabooListItem).at(1).text()).toEqual("Player 2")

	})

	test('FilterTabooList displays none message if no values for filterKey and filterValue in list', () => {
		const props = {
			...defaultProps,
			filterValue: "team 2"
		}

		const wrapper = mount(
			<ThemeProvider theme={theme}>
				<FilteredTabooList {...props} />
			</ThemeProvider>
		)
		
		expect(wrapper.find(TabooListItem).length).toBe(1)
		expect(wrapper.find(TabooListItem).text()).toEqual(noneMessage)
	})
})
