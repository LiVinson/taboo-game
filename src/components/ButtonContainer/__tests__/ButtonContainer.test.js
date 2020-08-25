import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import ButtonContainer from '../index'
import { Button, PrimaryButton, LargeButton } from 'components/shared/Button'

describe('Button Container renders and functions correctly', () => {
	const defaultProps = {
		buttons: [
			{ text: 'Back', onClick: jest.fn() },
			{ text: 'Next', onClick: jest.fn() },
		],
	}

	test('Button Container renders correctly', () => {
		const props = {
			...defaultProps,
		}

		const wrapper = renderer
			.create(
				<ThemeProvider theme={theme}>
					<ButtonContainer {...props} />
				</ThemeProvider>
			)
			.toJSON()

		expect(wrapper).toMatchSnapshot()
	})

	test('Renders Button and PrimaryButton when info for 2 buttons provided', () => {
		const props = {
			...defaultProps,
		}
		const wrapper = shallow(<ButtonContainer {...props} />)

    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(PrimaryButton)).toHaveLength(1)
    expect(wrapper.find(LargeButton)).toHaveLength(0)
		})

	test('Renders Button, PrimaryButton, and LargeBytton when info for 3 buttons provided', () => {
		const props = {
      buttons: [...defaultProps.buttons, 	{ text: 'Play!', onClick: jest.fn() }],
    }

		const wrapper = shallow(
				<ButtonContainer {...props} />
		)

    expect(wrapper.find(Button)).toHaveLength(1)
    expect(wrapper.find(PrimaryButton)).toHaveLength(1)
    expect(wrapper.find(LargeButton)).toHaveLength(1)
	})
})
