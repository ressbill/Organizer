const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    costs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'cost'
        }
    ],
    income: [
        {
            type: Schema.Types.ObjectId,
            ref: 'income'
        },
    ],
    owner: {
        type: Schema.Types.ObjectID,
        ref: 'user'
    }

})
module.exports = mongoose.model('wallet', userSchema)
