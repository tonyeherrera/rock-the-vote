import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const UserContext = React.createContext()
const voterAxios = axios.create() 

voterAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserContextProvider(props){
    const Navigate = useNavigate()
    const initState = {
        voter: JSON.parse(localStorage.getItem("voter")) || {}, 
        token: localStorage.getItem("token") || "", 
        topics: [],
        errMsg:""
    }

    const initTopic = {
        title: "",
        description:"",
        upvote:[],
        downvote:[],
        voter:{},
        author:""
    }

    const initComment = {
        comment:"",
        topic:{},
        voter:{},
        author:""
    }

    const [userState, setUserState] = useState(initState)
    const [allTopics, setAllTopics] = useState([])
    const [topicDetails, setTopicDetails] = useState(initTopic)
    const [comments, setComments] = useState([])
    const [voterComment, setVoterComment] = useState({initComment})
    

    function signup(credentials){
        axios.post("/auth/signup", credentials)
            .then(res => {
                const {voter, token} = res.data
                localStorage.setItem("token",token)
                localStorage.setItem("voter", JSON.stringify(voter))
                setUserState( prevUserState => ({
                    ...prevUserState,
                    voter, 
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post("/auth/login", credentials)
            .then(res => {
                const {voter, token} = res.data
                localStorage.setItem("token",token)
                localStorage.setItem("voter", JSON.stringify(voter))
                getUserTopics()
                setUserState( prevUserState => ({
                    ...prevUserState,
                    voter, 
                    token,
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("voter")
        setUserState({
                voter: {},
                token: "",
                topics:[],
                errMsg:""
        })
        Navigate("/")
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getAllTopics(){
        voterAxios.get("/api/topics")
            .then(res => setAllTopics(res.data))
            .catch(err => console.log(err))
    }

    function getDetails(topicId){
        voterAxios.get(`/api/topics/${topicId}`)
            .then(res => setTopicDetails(res.data))
            .catch(err => console.log(err))
    }

    function getComments(){
        voterAxios.get("/api/topic/comments")
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }

    function getUserTopics(){
        voterAxios.get("/api/topics/voter")
            .then(res => 
                // console.log(res.data))
                setUserState(prevUserState => ({
                ...prevUserState,
                topics: res.data
            })))
            .catch(err => console.log(err))
    }

    
    function addTopic(newTopic){
        voterAxios.post("/api/topics", newTopic)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    topics: [...prevUserState.topics, res.data]
                }))
            })
            .catch(err => console.log(err.res.data.errMsg))
    }

    function addComment(newComment, topicId){
        voterAxios.post(`/api/topic/comments/${topicId}`, newComment)
            .then(res => {
                setVoterComment(prevVoterComment => ({
                    ...prevVoterComment,
                    res
                }))
            })
            .catch(err => console.log(err))
    }

    function voting(topicId, update){
        voterAxios.put(`/api/topics/${topicId}`, update)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr,
                getAllTopics,
                allTopics,
                getDetails,
                topicDetails,
                setTopicDetails,
                getComments,
                comments,
                getUserTopics,
                addTopic,
                addComment,
                voting
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}