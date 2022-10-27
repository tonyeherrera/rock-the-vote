import React, {useContext, useState} from "react"
import {UserContext} from "../context/UserContext"

function CommentForm(props){
    const {addComment} = useContext(UserContext)
    const [inputs, setInputs] = useState({comment: ""})
    const {topicId} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs, 
            [name]: value
        }))
    }

    function handleSubmit(e){
        addComment(inputs, topicId)
        setInputs({comment:""})
    }

    const {comment} = inputs

    return(
        <form onSubmit = {handleSubmit}>
            <input 
                type = "text"
                name = "comment"
                value = {comment}
                onChange = {handleChange}
                placeholder = "Add Comment"/>
            <button>Submit</button>
        </form>
    )
}

export default CommentForm