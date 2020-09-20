import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import RadioListItem from '../RadioListItem'

describe('RadioListItem', () => {
	const defaultProps = {
		word: 'apple',
		index: 0,
		status: 'correct',
		onChange: jest.fn(),
	}

	test('Renders correctly', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<RadioListItem {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Selecting radio button fires props.onChange', () => {
		const props = {
			...defaultProps,
		}
		const component = mount(
			<ThemeProvider theme={theme}>
				<RadioListItem {...props} />
			</ThemeProvider>
		)
		// const component = wrapper.dive().find(RadioListItem)
		const radio = component.find('radio')
		const label = component.find('label')
		label.simulate('click', { target: { value: props.index } })

        expect(radio.value).toBe(props.value)
	})
})
