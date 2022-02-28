const customerModel = require('../models/customerModel')
const cardModel = require('../models/cardModel')

const createCard = async function(req, res){
    try{
        const requestBody = req.body
        const {customerID} = requestBody
        const customer = await cardModel.find()
        if(customer.length == 0){
            requestBody["cardNumber"] = 'C0001'
        }
        else{
            let cardNum = customer[customer.length-1].cardNumber
            let newNum = Number(cardNum.replace('C',"")) + 1
            let card = cardNum.split("")[0]
            for(let i=0;i<4-String(newNum).length;i++){
                card += 0
            }
            card += newNum
            requestBody.cardNumber = card
        }
        const data = await customerModel.findOne({customerID})
        if(!data){
            return res.status(404).send({status:false, message:`no customer found with ${customerID} ID`})
        }
        const customerFound = await cardModel.findOne({customerID})
        if(customerFound){
            return res.status(404).send({status:false, message:`card already created with ${customerID}`})
        }
        const create = await cardModel.create(requestBody)
        return res.status(201).send({status:true, data:create})
    }
    catch(err){
        return res.status(500).send({status:false, message: err.message})
    }
}

const getCard = async function(req,res){
    try{
        const getCust = await cardModel.find()
        return res.status(200).send({status:true, message:'card fetched successfully', data:getCust})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

module.exports = {createCard, getCard}