import React from "react"
import WordCard from "./WordCard"


export default function InRound({wordInfo, isGiver, isWatcher, nextCard}){
    if (isGiver || isWatcher) {
        console.log(wordInfo)
        const {taboo1, taboo2,taboo3,taboo4, taboo5, word} = wordInfo
        const tabooArray = [taboo1, taboo2, taboo3, taboo4, taboo5]
        return(
        <div>        
            <WordCard      
                word={word}         
                tabooWords={tabooArray}
            />
            <div>
                <button onClick={()=> nextCard("skipped")}>Skip Word!</button>
                <button onClick={()=> nextCard("correct")}>Correct!</button>
            </div>
        
        </div>
      )
    }  else {
        return <p>Someone else's turn to give/watch</p>
    }  

}