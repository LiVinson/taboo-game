import React from "react"
import TabooCard from "../../components/TabooCard"
import { Redirect } from "react-router-dom"
import rules from "./rulesText"

export default function Rules({ match }) {
  //A number that determines index of rule to display
  const { topic } = match.params
  console.log(topic)

  const buttonInfo = [
    {
      text: "Back",
      handleClick: () => {
        console.log("Back!")
      },
    },
    {
      text: "Next",
      handleClick: () => {
        console.log("Next!")
      },
    },
  ]
  return (
    <TabooCard
      tabooWord="How to Play"
      list={null}
      buttons={buttonInfo}
      type="home"
    >
      <RulesText topic={topic} />
    </TabooCard>
  )
}

function RulesText({ topic }) {
  console.log(topic)

  const rulesInfo = rules[parseInt(topic)]

  if (rulesInfo) {
    return (
      <React.Fragment>
        <h5>{rulesInfo.title}</h5>
        {rulesInfo.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </React.Fragment>
    )
  } else {
    return <Redirect to="/404" />
  }
}
