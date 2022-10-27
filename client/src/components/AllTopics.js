import React from "react"
import Topic from "./Topic.js"

function AllTopics(props){
    const {topics} = props
    return (
        <div className="all-topics">
            {topics.map(topic => <Topic {...topic} key= {topic._id}/>)}
        </div>
    )
}

export default AllTopics