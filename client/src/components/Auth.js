import React, {useState, useContext} from "react"
import AuthForm from "./AuthForm.js"
import { UserContext } from "../context/UserContext.js"

const initInputs = {username: "", password: ""}


function Auth (){
    const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs, 
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return(
        <div className="auth-container">
            <h1>Rock The Vote</h1>
            { !toggle ?
             <>
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Login"
                    errMsg={errMsg}
                />
                <p onClick = {toggleForm}>Not a member?</p>
            </>
            :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign Up"
                        errMsg={errMsg}
                    />
                    <p onClick= {toggleForm}>Already a member?</p>
                </>
            }
        </div>
    )
};

export default Auth;