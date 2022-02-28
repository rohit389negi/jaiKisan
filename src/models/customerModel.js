const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

firstName : {
    type : String
},
lastName : {
    type : String
},
mobileNumber : {
    type : String,
    required : true,
    min : 10,
    max : 10
},
DOB : {
    type : Date
},
emailID : {
    type : String,
    required : true
},
address : {
    type : String
},
customerID : {
    type : String
},
status : {
    type : String,
    required : true,
    enum:['ACTIVE', 'INACTIVE']
},
isDeleted : {
    type : Boolean,
    default : false
}
}, { timestamps : true })

module.exports = mongoose.model('customer', customerSchema)
