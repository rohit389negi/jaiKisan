const customerModel = require('../models/customerModel')

const createCustomer = async function(req,res){
    try{
        const requestBody = req.body
        requestBody.customerID = Date.now()
        const { mobileNumber, emailID} = requestBody

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID))){
            return res.status(400).send({status: false, message: 'Valid E-mail is required'})
        } 
        if(!(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(mobileNumber))){
            return res.status(400).send({status: false, message: 'Valid mobile number is required'})
        } 

        const data = requestBody
        const create = await customerModel.create(data)
        return res.status(201).send({status:true, message: 'customer created successfully',data:create})
    }
    catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

const getCustomer = async function(req,res){
    try{
        const getActiveCustomer = await customerModel.find({status:'ACTIVE'}) 
        return res.status(200).send({status:true, message:'ACTIVE customer list successfully fetched',data:getActiveCustomer})
    }
    catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

const deleteCustomer = async function(req, res){
    try{
        const customerID = req.params.customerID
        const deleteCust = await customerModel.findOneAndUpdate({customerID, isDeleted : false}, {isDeleted : true}, {new : true})
        return res.status(200).send({status:true, message:'customer deleted successfully', data: deleteCust})
    }
    catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

module.exports = {createCustomer, getCustomer, deleteCustomer}