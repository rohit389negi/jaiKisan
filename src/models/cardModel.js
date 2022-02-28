const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({

    cardNumber : {
        type : String,
        required : true
    },
    cardType : {
        type : String,
        enum : ['REGULAR', 'SPECIAL'],
        required : true
    },
    customerName : {
        type : String
    },
    status : {
        type : String,
        enum : ['ACTIVE', 'INACTIVE'],
        default : 'ACTIVE'
    },
    vision : {
        type : String,
    },
    customerID : {
        type: String,
        required : true
    }
}, { timestamps : true })

module.exports = mongoose.model('card', cardSchema)
