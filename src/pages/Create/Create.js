import React from "react"
import "./Create.scss"
import TabooCard from "../../components/TabooCard"


export default function Create({props}) {
  return (

        <TabooCard
          tabooWord="Create New Game"
          list={null}
           > 
            <form>
                <label>This is a label</label>
                <input/>
            </form>
        </TabooCard>


  )
}