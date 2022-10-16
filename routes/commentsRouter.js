const express = require('express')
const comments = require('../models/comments.js')
const commentsRouter = express.Router()
const Comment = require('../models/comments.js')
const topic = require('../models/topic')

//get comments
commentsRouter.get('/:topicId/', (req, res, next) => {
    Comment.find({topicId: req.params.topicId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

//post comment
commentsRouter.post('/:topicId/', (req, res, next) => {
    req.body.topic = req.params.topicId
    req.body.voter = req.auth._id
    req.body.author = req.auth.username
    const newComment = new comments(req.body)
    newComment.save((err, savedComment) =>
        {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment
commentsRouter.delete('/:topicId/:commentId', (req, res, next) =>{
    Comment.findOneAndDelete(
        {_id: req.params.commentId, voter: req.auth._id},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send('Successfully deleted comment')
        }
    )
})

//edit comment
commentsRouter.put('/:topicsId/:commentId', (req, res, next) => {
    topic.findOneAndUpdate(
        {_id: req.params.commentId, voter: req.auth._id},
        req.body,
        {new: true},
        (err, updatedComment) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

module.exports = commentsRouter