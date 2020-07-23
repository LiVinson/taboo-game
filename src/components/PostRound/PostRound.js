import React from 'react'
import { ButtonTabooCard } from 'components/shared/TabooCard'
import { PlayedCardList, TabooRadio, TabooLabel, TabooWord } from './style'
import { LargeButton } from "components/shared/Button"

const TabooSelection = ({ word, status, onChange }) => {
	return (
		<TabooWord>
			<TabooRadio
				type="radio"
				name="tabooWord"
				value={word}
				id={word}
				onChange={(e) => onChange(e.target.value, status)}
			/>
			<TabooLabel htmlFor={word}>{word}</TabooLabel>
		</TabooWord>
	)
}
/*
    ✔ For each card that was played, sort it into correct, skip, discard based on status
    ✔  For each status, return a Taboo card with status title
    ✔ In taboo body, loop over cards and display card.word as a radio button and label with radio hidden
    ✔ On selection of a radio button, style the label
    ✔ On click button, call function to > change the status(log for now)
    Word displays on new card list.
    On submit, call function to check if game is over
*/

class PostRound extends React.Component {
    constructor(props){
        super(props)

        this.state={
            correctSelection:"",
            skipSelection:"",
            discardSelection:"",
        }
    }

    //Called onchance of radio button value. Set in state so that on click to change the status, can determine which word is selected
    handleCardSelection = (card, status) => {
        console.log(card, status)
        const property = status + "Selection"
        this.setState({
            [property]: card
        })
    }

    //Called on click of the correct, skip, or discard buttons
    changeCardStatus = (oldStatus, newStatus) => {
        const property = oldStatus + "Selection"
        console.log("changing card from ", oldStatus)
        console.log("changing card to ", newStatus)
        console.log(`card changing: ${this.state[property]}`)   
    }
	render() {

        //Additional properties added based on which card button is appearing in.
        const correctButton={text: "Correct", className:"button"}
        const skipButton = {text: "Skip", className:"button"}
        const discardButton={text: "Discard", className:"button"}

        //Used to disable correct, skip, discard buttons if know taboo word is selected to update the status
        const correctSelected = this.state.correctSelection.length < 1;        
        const skipSelected = this.state.skipSelection.length < 1;        
        const discardSelected = this.state.discardSelection.length < 1;

        //Separates cards played in round based on card status
		const correct = this.props.cardsPlayed.filter((card, index) => card.status === 'correct')
		const skip = this.props.cardsPlayed.filter((card, index) => card.status === 'skip')
		const discard = this.props.cardsPlayed.filter((card, index) => card.status === 'discard')
        
        return (
            <React.Fragment>
            {/* Additional props baseed to buttons: if button should be disabled, and onClick containing current card status based on Taboo container it appears in, and new card status based on which button it is*/}
				<ButtonTabooCard tabooWord="Correct!" buttons={[{...skipButton, disabled: correctSelected, onClick:()=> { this.changeCardStatus("correct", "skip")}}, {...discardButton, onClick:()=> { this.changeCardStatus("correct", "discard")}, disabled: correctSelected}]}>
					<PlayedCardList>
						{correct.map((card, index) => (
							<TabooSelection key={index} word={card.word} onChange={this.handleCardSelection} status="correct"/>
						))}
					</PlayedCardList>
				</ButtonTabooCard>
				<ButtonTabooCard tabooWord="Skip!" buttons={[{...correctButton, disabled: skipSelected, onClick:()=> { this.changeCardStatus("skip", "correct")}}, {...discardButton, disabled: skipSelected, onClick:()=> { this.changeCardStatus("skip", "discard")}}]}>
					<PlayedCardList>
						{skip.map((card, index) => (
							<TabooSelection key={index} word={card.word} onChange={this.handleCardSelection} status="skip"/>
						))}
					</PlayedCardList>
				</ButtonTabooCard>

				<ButtonTabooCard tabooWord="Discard!" buttons={[{...correctButton, disabled: discardSelected, onClick:()=> { this.changeCardStatus("discard", "correct")}}, {...skipButton, disabled: discardSelected, onClick:()=> { this.changeCardStatus("discard", "skip")}}]}>
					<PlayedCardList>
						{discard.map((card, index) => (
							<TabooSelection key={index} word={card.word} onChange={this.handleCardSelection} status="discard"/>
						))}
					</PlayedCardList>
                </ButtonTabooCard>
                <LargeButton text="Confirm!" onClick={() => console.log("Confirming cards.")}/>

			</React.Fragment>
		)
	}
}

export default PostRound
