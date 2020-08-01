import React from "react"
import renderer from "react-test-renderer"
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../../../global-design/theme'
import InRound from "../InRound"
import TimeCard from 'components/TimeCard'
import { GiverGameCard, WatcherGameCard, TeamGameCard } from 'components/GameCard'



test("renders correctly", () => {
    const props = {
        giver: "Sam",
        watcher: "Jo",
        role: "giverTeam" 
    }

    const wrapper = renderer.create(
        <ThemeProvider theme={theme}>
            <InRound {...props} />
            </ThemeProvider>).toJSON()
    expect(wrapper).toMatchSnapshot()
})

test("renders TimeCard and GiverGame card when role is giver", () => {
    const props = {
        giver: "Sam",
        watcher: "Jo",
        role: "giver" 
    }

    const wrapper = mount(
        <ThemeProvider theme ={theme}>
            <InRound {...props} />
        </ThemeProvider>)

        expect(wrapper.find(TimeCard)).toHaveLength(1)
        expect(wrapper.find(GiverGameCard)).toHaveLength(1)
        expect(wrapper.find(WatcherGameCard)).toHaveLength(0)
        expect(wrapper.find(TeamGameCard)).toHaveLength(0)
    })

    test("renders TimeCard and WatcherGameCard when role is watcher", () => {
        const props = {
            giver: "Sam",
            watcher: "Jo",
            role: "watcher" 
        }
    
        const wrapper = mount(
            <ThemeProvider theme ={theme}>
                <InRound {...props} />
            </ThemeProvider>)
    
            expect(wrapper.find(TimeCard)).toHaveLength(1)
            expect(wrapper.find(WatcherGameCard)).toHaveLength(1)
            expect(wrapper.find(GiverGameCard)).toHaveLength(0)
            expect(wrapper.find(TeamGameCard)).toHaveLength(0)
        })

        
    test("renders TimeCard and TeamGameCard when role is giverTeam or watcherTeam", () => {
        const props = {
            giver: "Sam",
            watcher: "Jo",
            role: "giverTeam" 
        }
    
        const wrapper = mount(
            <ThemeProvider theme ={theme}>
                <InRound {...props} />
            </ThemeProvider>)
    
            expect(wrapper.find(TimeCard)).toHaveLength(1)
            expect(wrapper.find(TeamGameCard)).toHaveLength(1)
            expect(wrapper.find(WatcherGameCard)).toHaveLength(0)
            expect(wrapper.find(GiverGameCard)).toHaveLength(0)
        })
