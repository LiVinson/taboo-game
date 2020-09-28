import React from 'react'
import { shallow, mount } from 'enzyme'
import Container from 'components/Container'
import Wrapper from "components/Wrapper"


test('Container renders without crashing', () => {
	const data = <h1>Hello</h1>
	shallow(<Container>{data}</Container>)
})

test("Contains the Wrapper component", () => {
    const data = <h1>Hello</h1>
    const wrapper = shallow(<Container>{data}</Container>)
    expect(wrapper.find(Wrapper)).toHaveLength(1)
})

test("Contains children", () => {
    const data = <h1>Hello</h1>
    const wrapper = shallow(<Container>{data}</Container>)
    expect(wrapper.contains(<h1>Hello</h1>)).toEqual(true)
})