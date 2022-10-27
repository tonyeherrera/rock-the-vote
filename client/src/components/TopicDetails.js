import React, { useContext, useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import CommentForm from "./CommentForm.js"
import {UserContext} from "../context/UserContext"



function TopicDetails(){
    
    const {topicId} = useParams()
    const {comments, topicDetails, setTopicDetails, getComments, getDetails, voting, voter:{username}} = useContext(UserContext)
    const {title, description, upvotes, downvotes, author} = topicDetails
    

    console.log(topicId)

    useEffect(() => {
        getDetails(topicId)
    }, [])

    useEffect(() => {
        getComments(topicId)
    },[])

    function vote(e){
        const {id} = e.target
        const updatedUpvotes = topicDetails.upvotes.filter(alreadyVoted)
        const updatedDownvotes = topicDetails.downvotes.filter(alreadyVoted)
        id ===  "upvotes" ?
        downvotes.some(voter => voter === username) ?
        !upvotes.some(voter => voter === username) &&
        setTopicDetails(prevDetails => ({
            ...prevDetails,
            upvotes:[...prevDetails.upvotes, username],
            downvotes:[updatedDownvotes]  
        }))
        :
        !upvotes.some(voter => voter === username) &&
        setTopicDetails(prevDetails => 
            ({
            ...prevDetails,
            upvotes:[...prevDetails.upvotes, username]
        }))
        :
        upvotes.some(voter => voter === username) ?
        !downvotes.some(voter => voter === username) &&
        setTopicDetails(prevDetails => ({
            ...prevDetails,
            downvotes:[...prevDetails.downvotes, username], 
            upvotes:[updatedUpvotes]
        })) 
        :
        !downvotes.some(voter => voter === username) &&
        setTopicDetails(prevDetails => ({
            ...prevDetails,
            downvotes:[...prevDetails.downvotes, username] 
        })) 
    }

    function alreadyVoted(){
        return username !== username
    }

    useEffect(()=>{
        voting(topicId, topicDetails)
    }, [vote])

    return(
        <div className="Topic" >
                <h1>{title}</h1>
                <h3>{description}</h3>
                <div>
                    <p>Author: {author}</p>
                    <p>{comments.filter(comment => comment.topic === topicId).length} comments</p>
                    <div>
                            <p>Upvotes ({upvotes ? upvotes.length : 0})</p><button onClick={vote} id="upvotes">UP</button>
                            <p>Downvotes ({downvotes ? downvotes.length : 0})</p><button onClick={vote} id="downvotes">Down</button>
                    </div>
                </div>
                <hr/>
                    <CommentForm  topicId={topicId}/>
                    {comments.filter(comment => comment.topic === topicId).map(comment =>  {
                            return( <div key={comment._id}>
                                    <p>{comment.author}</p>
                                    <p>{comment.comment}</p>
                                </div>
                                )
                    })}
        </div>
    )
}

export default TopicDetails