import React from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import TabooCard from "components/TabooCard"
import rules from "./rulesText"
import { RulesTitle, RulesText } from "./style"



export default class Rules extends React.Component {
  displayPreviousRule = () => {
    const currentTopicId = parseInt(this.props.match.params.topic)
    if (currentTopicId > 0) {
      this.props.history.push(`/home/rules/${currentTopicId - 1}`)
    } else {
      this.props.history.push("/home")
    }
  }

  displayNextRule = () => {
    const currentTopicId = parseInt(this.props.match.params.topic)
    if (currentTopicId < rules.length - 1) {
      this.props.history.push(`/home/rules/${currentTopicId + 1}`)
    } else {
      this.props.history.push("/home")
    }
  }

  render() {
    const currentTopicId = parseInt(this.props.match.params.topic)
    const buttonInfo = [
      {
        text: currentTopicId > 0 ? "Back" : "Close",
        onClick: this.displayPreviousRule,
      },
      {
        text: currentTopicId < rules.length -1 ? "Next" : "Close",
        onClick: this.displayNextRule,
      },
    ]

    return (
      <TabooCard tabooWord="How to Play" buttons={buttonInfo} type="home">
        <DisplayRulesText topicId={currentTopicId} />
      </TabooCard>
    )
  }
}

Rules.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

function DisplayRulesText({ topicId }) {
  const rulesInfo = rules[topicId]
  if (rulesInfo) {
    return (
      <React.Fragment>
        <RulesTitle>{rulesInfo.title}</RulesTitle>
        {rulesInfo.text.map((paragraph, index) => (
          <RulesText key={index}>{paragraph}</RulesText>
        ))}
      </React.Fragment>
    )
  } else {
    return <Redirect to="/404" />
  }
}

DisplayRulesText.propTypes = {
  topicId: PropTypes.number.isRequired,
}
