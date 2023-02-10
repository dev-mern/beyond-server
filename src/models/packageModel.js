const { default: mongoose } = require("mongoose");



const packageSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            unique:[true, "Name already exist"],
            // match: [/^[a-zA-Z]+$/,"Name is invalid"],
            lowercase: true,
            trim: true,
            maxLength: [50,"Maximum 50 characters are allowed"],
            minLength: [2,"Minimum 2 characters are required"]
        },
        price: {
            monthly: {
                type: Number,
                required: [true, "Monthly price is required"],
                // default: 0
            },
            yearly: {
                type: Number,
                required: [true, "Yearly price is required"],
                // default: 0
            },
        },
        // period:{
        //     type: String,
        //     required: [true, "Period is required"],
        //     enum: ['monthly','yearly'],
        //     default: 'monthly'
        // },
        booking_limit:{
            type: Number,
            required: [true, "Booking limit is required"],
            default: 0
        },
        booking_unit:{
            type: String,
            required: [true, "Booking unit is required"],
            enum: ['only','K','M','B','T'],
            default: "only",
        },  
        facilities:{
            list:[{     // "weekly bookkeeping","up to _x_ bank/credit card", "_y_ integration"
                type:String,
                required: [true,"Facilities can't be empty."]
            }],
            bank_card_limit: {
                type: Number,
                required: [true, "Must have a limit of Bank/Credit Card number"],
            },
            integration_limit: {
                type: Number,
                required: [true, "Must have a limit of integrations"],
            },
        },
        status:{
            type: String,
            required: [true,"Status is required"],
            enum: ["active","inactive"],
            default: "active"
        }
    },
    {
        timestamps:{createdAt:true,updatedAt:true}
    }
)


const PackageModel = mongoose.model("Packages",packageSchema);

module.exports = {PackageModel}

