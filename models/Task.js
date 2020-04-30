const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tasksSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: Schema.Types.ObjectID,
        required:true,
        ref: 'user'
    }
})

module.exports = mongoose.model('task', tasksSchema )
