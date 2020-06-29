import React from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import TabooCard from "components/TabooCard"
import rules from "./rulesText"

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
    const ruleBtns = [
      {
        text: currentTopicId > 0 ? "Back" : "Close",
        handleClick: this.displayPreviousRule,
      },
      {
        text: currentTopicId < rules.length ? "Next" : "Close",
        handleClick: this.displayNextRule,
        type:"primary-color"
      },
    ]

    return (
      <TabooCard
        tabooWord="How to Play"
        list={null}
        buttons={ruleBtns}
        type="home"
      >
        <RulesText topicId={currentTopicId} />
      </TabooCard>
    )
  }
}

Rules.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

function RulesText({ topicId }) {
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
  topicId: PropTypes.number.isRequired,
}
