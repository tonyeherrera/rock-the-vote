const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    upvotes:{
        type: Number,
        default: 0
    },
    downvotes:{
        type: Number,
        default: 0
    },
    voter:{
        type: Schema.Types.ObjectId,
        ref:"Voter",
        required: true
    },
    author:{
        type: String,
        ref: "Voter",
        required: true
    }
})

module.exports = mongoose.model("Topic", topicSchema)