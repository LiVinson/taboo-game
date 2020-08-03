import React from "react"
import renderer from "react-test-renderer"
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import PostRound from "../PostRound"
import { LargeButton } from 'components/shared/Button'
import { NoCardMessage } from "../style.js"

test("PostRound renders correctly", () => {

    const props = {
        cardsPlayed: [{
            word: 'Simba',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Mufasa',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Scar',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Voldemort',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        },
        {
            word: 'American Revolution',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'discard',
        }],
        confirmRoundEnd: jest.fn(),
        isWatcher: true
    }

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <PostRound {...props} />
        </ThemeProvider>
    ).toJSON()

    expect(wrapper).toMatchSnapshot()
})

test("renders large button when isWatcher is true", () => {
    const props = {
        cardsPlayed: [{
            word: 'Simba',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Mufasa',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Scar',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Voldemort',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        },
        {
            word: 'American Revolution',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'discard',
        }],
        confirmRoundEnd: jest.fn(),
        isWatcher: true
    }

    const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PostRound {...props} />
        </ThemeProvider>
        )

       expect(wrapper.find(LargeButton)).toHaveLength(1) 
})

test("does not render large button when isWatcher is false", () => {
    const props = {
        cardsPlayed: [{
            word: 'Simba',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Mufasa',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Scar',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Voldemort',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        },
        {
            word: 'American Revolution',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'discard',
        }],
        confirmRoundEnd: jest.fn(),
        isWatcher: false
    }

    const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PostRound {...props} />
        </ThemeProvider>
        )

       expect(wrapper.find(LargeButton)).toHaveLength(0) 
})

test("Renders playerlist for card status or no card message", () => {
    const props = {
        cardsPlayed: [{
            word: 'Simba',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Mufasa',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Scar',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Voldemort',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        },
        {
            word: 'American Revolution',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        }],
        confirmRoundEnd: jest.fn(),
        isWatcher: false
    }

    const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PostRound {...props} />
        </ThemeProvider>
    )

    expect(wrapper.find(NoCardMessage).text()).toBe("No cards discarded this round")
})

test("confirmRoundEnd is called when Confirm button selected", () => {
    const props = {
        cardsPlayed: [{
            word: 'Simba',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Mufasa',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Scar',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'correct',
        },
        {
            word: 'Voldemort',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        },
        {
            word: 'American Revolution',
            taboo: ['something', 'something', 'something', 'something', 'something'],
            status: 'skip',
        }],
        confirmRoundEnd: jest.fn(),
        isWatcher: true
    }

    const wrapper = mount(
        <ThemeProvider theme={theme}>
          <PostRound {...props} />
        </ThemeProvider>
    )

    wrapper.find(LargeButton).simulate("click")
    expect(props.confirmRoundEnd.mock.calls[0]).toHaveLength(1)
})