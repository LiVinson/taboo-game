import React from 'react'
import { ThemeProvider } from 'styled-components'
import { mount, shallow } from 'enzyme'
import theme from "../global-design/theme";



const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
)

export const shallowWithTheme = tree => shallow(tree, {
  wrappingComponent: ThemeProviderWrapper
})

export const mountWithTheme = tree => mount(tree, {
  wrappingComponent: ThemeProviderWrapper
})