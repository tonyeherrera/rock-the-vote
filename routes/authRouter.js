const express = require('express')
const authRouter = express.Router()
const Voter = require('../models/voter.js')
const jwt = require("jsonwebtoken")

authRouter.post("/signup", (req, res, next) => {
    Voter.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("That username is already taken"))
        }
        const newVoter = new Voter(req.body)
        newVoter.save((err, savedVoter) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token =jwt.sign(savedVoter.toObject(), process.env.SECRET)
            return res.status(201).send({
            token, voter: savedVoter})
        })
    })
})

authRouter.post("/login", (req, res, next) => {
    Voter.findOne({ username: req.body.username.toLowerCase() }, (err, voter) => {
        if(err){
            res.status(500)
            return next.apply(err)
        }
        if(!voter){
            res.status(403)
            return next(new Error("Username or Password incorrect"))
        }
        if(req.body.password !== voter.password){
            res.status(403)
            return next(new Error("Username or Password incorrect"))
        }
        const token = jwt.sign(voter.toObject(), process.env.SECRET)
        return res.status(200).send({ token, voter})
        })
})

module.exports = authRouter

