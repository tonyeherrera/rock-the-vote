import React, {useState} from "react"

const initInputs = {
    title:"",
    description:""
}

function TopicForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const {addTopic} = props
    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]:value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addTopic(inputs)
        setInputs(initInputs)
    }

    const {title, description} = inputs
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"/>
            <input 
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"/>
            <button onSubmit={handleSubmit}>Submit</button>
        </form>
    )
}

export default TopicForm