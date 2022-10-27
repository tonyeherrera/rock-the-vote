import React, { useContext, useEffect } from "react"
import TopicForm from "./TopicForm.js"
import { UserContext } from "../context/UserContext.js"
import MyTopics from "./MyTopics.js"


function Profile(){

    const { voter: {username}, addTopic, topics, getUserTopics } = useContext(UserContext)
    
    useEffect(()=>{
        getUserTopics()
    }, [])

    return(
        <div className="profile">
            <h1>Welcome @{username}!</h1>
            <h3>Add Topic</h3>
            <TopicForm addTopic={addTopic}/>
            <h3>Your Topics</h3>
            <hr></hr>
            <MyTopics topics={topics}/>
        </div>
    )
}

export default Profile