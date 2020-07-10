import { TabooCard } from "components/shared/TabooCard"
import React from "react"

export default function LayeredCards() {
  return (
    <React.Fragment>
      <TabooCard
        type="middle"
        tabooWord="Taboo!"
        list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
      />
      <TabooCard
        tabooWord="Taboo!"
        type="bottom"
        list={["Taboo!", "Taboo!", "Taboo!", "Taboo!"]}
      />
    </React.Fragment>
  )
}
