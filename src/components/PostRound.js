import React from "react"
//test
export default class PostRound extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: props.cardsPlayed
    }

    this.changeCardStatus = this.changeCardStatus.bind(this)
    this.confirmCards = this.confirmCards.bind(this)
  }



  changeCardStatus(newStatus, word) {
    //finds the word to update, then updates the status

    this.setState((state) => {
        const updatedCards = [...state.cards]
        console.log("played cards: ", updatedCards)
        console.log("newstatus:", newStatus )
        console.log(word)
     
        const cardIndex = updatedCards.findIndex(card => card.word === word)
        updatedCards[cardIndex].status = newStatus
        return {
            cards: updatedCards
        }
    })
  }

  confirmCards() {
      console.log("cards Confirmed")
      console.log(this.state.cards)
      this.props.confirmRoundEnd(this.state.cards)
  }

  render() {
    const { cards } = this.state
    const correctCards = cards.filter(card => card.status==="correct")
    const skippedCards = cards.filter(card => card.status==="skipped")
    const noneCards = cards.filter(card => card.status==="none")
    return (
      <div>
        <h1>Post Round</h1>
        <h3>Correct Cards</h3>
        <ul>
          {correctCards.map((card) => (
            <li key={card.word}>
              <p>{card.word}</p>
              <button
                onClick={() =>
                  this.changeCardStatus("skipped", card.word)
                }
              >
                Move to Skipped
              </button>
              <button
                onClick={() =>
                  this.changeCardStatus("none", card.word)
                }
              >
                Move to No Status
              </button>
            </li>
          ))}
        </ul>
        <h3>Skipped Cards</h3>
        <ul>
          {skippedCards.map((card) => (
            <li key={card.word}>
              <p>{card.word}</p>
              <button
                onClick={() =>
                  this.changeCardStatus("correct", card.word)
                }
              >
                Move to Correct
              </button>
              <button
                onClick={() =>
                  this.changeCardStatus("none", card.word)
                }
              >
                Move to No Status
              </button>
            </li>
          ))}
        </ul>
        <h3>No Status Cards</h3>
        
        <ul>
          {noneCards.map((card) => (
            <li key={card.word}>
              <p>{card.word}</p>
              <button
                onClick={() =>
                  this.changeCardStatus("correct", card.word)
                }
              >
                Move to Correct
              </button>
              <button
                onClick={() =>
                  this.changeCardStatus("skipped", card.word)
                }
              >
                Move to Skipped
              </button>
            </li>
          ))}
        </ul>
        {this.props.isWatcher 
            ? <button
                onClick={this.confirmCards}>Confirm Cards</button>
            : null }
        
      </div>
    )
  }
}
