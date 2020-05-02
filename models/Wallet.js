const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    costs: [
        {
            name: {
                type: String,
            },
            price: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        },
    ],
    income: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'user'
    }

})
module.exports.wallet = mongoose.model('wallet', userSchema)
