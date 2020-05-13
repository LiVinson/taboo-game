import React from "react"
import WordCard from "./WordCard"

export default function InRound({wordInfo, isGiver, isWatcher}){
    if (isGiver || isWatcher) {
        console.log(wordInfo)
        const {taboo1, taboo2,taboo3,taboo4, word} = wordInfo
        const tabooArray = [taboo1, taboo2, taboo3, taboo4]
        return(
        <div>
            <WordCard
                word={word}
                tabooWords={tabooArray}
            />
            <div>
                <button onClick={()=> console.log("skip it!")}>Skip Word!</button>
                <button onClick={()=> console.log("correct!")}>Correct!</button>
            </div>
        
        </div>
      )
    }  else {
        return <p>Someone else's turn to give/watch</p>
    }  

}