import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {UserContext} from "../context/UserContext.js"

function Topic(props){
    const {title, description, _id, author, upvotes, downvotes} = props
    const {comments, getDetails} = useContext(UserContext)
    
    function handleClick(){
        getDetails(_id)
    }

    return(
        <div className="Topic" >
            <Link to={`/${_id}`} onClick={handleClick} >
            <h1>{title}</h1>
            <h3>{description}</h3>
            </Link>
            <div>
                <p>Author: {author}</p>
                <p>{comments.filter(comment => comment.topic === _id).length} comments</p>
                <div>
                    <p>Upvotes ({upvotes ? upvotes.length : 0})</p>
                    <p>Downvotes ({downvotes ? downvotes.length : 0})</p>
                </div>
            </div>
        </div>
    )
}

export default Topic