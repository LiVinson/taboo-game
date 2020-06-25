import TabooCard from "../TabooCard"
import React from "react"

export default function LayeredCards(){
    return (
        <React.Fragment>
        <TabooCard
        type="middle"
        tabooWord="Taboo"
        list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
    />
    <TabooCard
        tabooWord="Menu"
        type="bottom"
        list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
    />
        </React.Fragment>

    )
}