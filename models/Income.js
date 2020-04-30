const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incomeSchema = new Schema({
    name: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    wallet: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'wallet'
    }
}, {timestamps: true})
module.exports = mongoose.model('income', incomeSchema)
