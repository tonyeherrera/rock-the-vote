const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voterSchema = new Schema({
    username:{
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        requrire: true
    },
    memberSince:{
        type: Date,
        default: Date.Now
    }
})

module.exports = mongoose.model('Voter', voterSchema)