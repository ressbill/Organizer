const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const tasksSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String
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
tasksSchema.plugin(uniqueValidator)
module.exports = mongoose.model('task', tasksSchema )
