const { CreditCardModel } = require("../models/creditCardModel");
const { errorFormatter } = require("../utils/formatter");


// add a new package
async function addCreditCardService(card) {
    // console.log(order);
    try {
        const CardBson = new CreditCardModel(card);
        const newCard = await CardBson.save();
        return newCard;
    } catch (error) {
        console.log(error.name);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}


// check if credit card exist 
async function checkCreditCardExist(filter={}) {
    try {
        const isCardExist = await CreditCardModel.exists({...filter});
        return isCardExist;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}


module.exports = {
    addCreditCardService,
    checkCreditCardExist
}