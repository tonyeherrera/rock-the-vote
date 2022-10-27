import React, { useContext, useEffect } from "react"
import AllTopics from "./AllTopics"
import {UserContext} from "../context/UserContext"
// import Topic from "./Topic.js"

function Public(){
    const {allTopics, getAllTopics, getComments} = useContext(UserContext)


    useEffect(() => {
        getAllTopics()
    }, [])

    useEffect(() => getComments(),[])
    

    return(
        <div className="public">
            <h2>Welcome to the public forum. Here you can Upvote, Downvote, and comment on current topics!</h2>
            <hr/>
            <AllTopics topics={allTopics}/>
        </div>
    )
}



export default Public