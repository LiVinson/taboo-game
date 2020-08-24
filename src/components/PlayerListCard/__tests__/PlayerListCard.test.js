import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PlayerListCard from '../PlayerListCard'
import { ButtonTabooCard, TabooCard } from 'components/shared/TabooCard'

describe('PlayerLIstCard render and functionality is correct', () => {
	const defaultProps = {
		buttonInfo: [
			{
				text: 'Team 1',
				value: 'team 1',
				onClick: jest.fn(),
			},
			{
				text: 'Team 2',
				value: 'team 2',
				onClick: jest.fn(),
			},
		],
		tabooWord: 'Players',
	}

	const value = (
		<ul>
			<li>Child 1</li>
			<li>Child 2</li>
		</ul>
	)

	test('renders correctly', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<PlayerListCard {...props}>{value}</PlayerListCard>
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('renders ButtonTabooCard when buttons prop provided', () => {
		const props = {
			...defaultProps,
		}
		const component = shallow(<PlayerListCard {...props}>{value}</PlayerListCard>)
		expect(component.find(ButtonTabooCard)).toHaveLength(1)
		expect(component.find(TabooCard)).toHaveLength(0)
	})

	test('renders TabooCard when buttons prop not provided', () => {
		const props = {
			tabooWord: 'Players'
		}

		const component = shallow(<PlayerListCard {...props}>{value}</PlayerListCard>)
		expect(component.find(ButtonTabooCard)).toHaveLength(0)
		expect(component.find(TabooCard)).toHaveLength(1)
	})
})
