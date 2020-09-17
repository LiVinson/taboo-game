import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import SubmitCardForm from 'components/SubmitCardForm'

test('SubmitCardForm renders correctly', () => {
	const props = {
		handleSubmit: jest.fn(),
		initialValues: {
			tabooWord: '',
			word1: '',
			word2: '',
			word3: '',
			word4: '',
			word5: '',
			successMsg: '',
		},
	}

	const wrapper = renderer.create(
		<ThemeProvider theme={theme}>
			<SubmitCardForm {...props} />
		</ThemeProvider>
	)
	expect(wrapper).toMatchSnapshot()
})
