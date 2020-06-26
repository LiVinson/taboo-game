import React from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import TabooCard from "components/TabooCard"
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
      <RulesText topicId={parseInt(topic)} />
    </TabooCard>
  )
}

Rules.propTypes = {
  match: PropTypes.object.isRequired
}

function RulesText({ topicId }) {
  console.log(topicId)

  const rulesInfo = rules[topicId]

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

RulesText.propTypes = {
  topicId: PropTypes.number.isRequired
}