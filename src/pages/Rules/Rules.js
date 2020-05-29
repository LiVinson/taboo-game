import React from "react"
import TabooCard from "../../components/TabooCard"
import { Redirect } from "react-router-dom"
import rules from "./rulesText"

export default function Rules({ match }) {
  const { topic } = match.params
  console.log(topic)

  const buttonObj={
    left: {
      text: "Back",
      handleClick: () => {console.log("Back!")}
    },
    right: {
      text: "Next",
      handleClick: () => {console.log("Next!")}
    }
  }
  return (
    <TabooCard
         tabooWord="How to Play" list={null}
         buttonObj={buttonObj}
    >
      <RulesText topic={topic} />
    </TabooCard>
  )
}

function RulesText({topic}) {
    console.log(topic)

    const rulesInfo = rules[parseInt(topic)]

    if (rulesInfo) {
        return (
            <React.Fragment>
                <h5>{rulesInfo.title}</h5>
                {rulesInfo.text.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </React.Fragment>
        )
        
    } else {
        return <Redirect to="/404" />

    }
}


