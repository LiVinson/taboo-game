import React from "react"
import WordCard from "./WordCard"

export default function InRound({wordInfo, isGiver, isWatcher}){
    if (isGiver || isWatcher) {
        console.log(wordInfo)
        const { word, tabooWords} = wordInfo
      return(
        <div>
            <WordCard
                word={word}
                tabooWords={tabooWords}
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