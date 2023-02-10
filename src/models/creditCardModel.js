
const { default: mongoose } = require("mongoose");

const creditCardSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:[true,"User id is required"],
            trim: true,
        },
        card_number:{
            type: Number,
            required:[true,"Card number is required"],
        },
        card_exp_at:{
            type: String,
            required: [true,"Expire date is required"],
        },
        card_cvc:{
            type: Number,
            required:[true,"CVC number is required"],  
        },
        card_billing_zip:{
            type: Number,
            required:[true,"Zip code is required"],
        },
        status:{
            type: String,
            required: [true,"Status is required"],
            enum:['active','inactive']
        }
        
    },
    {timestamps:{createdAt:true,updatedAt:true}}
)

const CreditCardModel = mongoose.model("CreditCard",creditCardSchema);

module.exports = {CreditCardModel}

// delete referenced docs id from other schema after deleting a doc
// ref: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb


