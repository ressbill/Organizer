const mongoose = require('mongoose')
const Schema = mongoose.Schema
const costSchema = new Schema({
        name: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        wallet: {
            type: Schema.Types.ObjectID,
            ref: 'wallet',
            required: true
        }
    },
    {
        timestamps: true
    })
module.exports = mongoose.model('cost', costSchema)
