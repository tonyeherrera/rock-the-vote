import React from "react"
import Topic from "./Topic.js"

function MyTopics(props){
    const { topics } = props
    return(
        <div className="my-topics">
             {topics.map(topic => <Topic {...topic} key={topic._id}/>)}
        </div>
    )
}

export default MyTopics