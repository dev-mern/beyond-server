
const { default: mongoose } = require("mongoose");

const planOrdersSchema = mongoose.Schema(
    {
        package: {
            type: mongoose.Schema.Types.ObjectId,
            required:[true,"Package id is required"],
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:[true,"User id is required"],
            unique:[true,"User already exist. Just update the information."],
            trim: true,
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            required:[true,"Company id is required"],
            trim: true,
        },
        // transection:{
        //     type: String,
        //     required:[true,"Transection id is required"],
        //     trim: true,
        // },
        // order_at:{
        //     type: Date,
        //     required: [true,"Order date is required"],
        // },
        // exp_at:{
        //     type: Date,
        //     required: [true,"Expire date is required"],
        // },
        // status:{
        //     type: String,
        //     required: [true,"Status is required"],
        //     enum:['active','inactive']
        // }
    },
    {timestamps:{createdAt:true,updatedAt:true}}
)

const PlanOrdersModel = mongoose.model("PlanOrders",planOrdersSchema);

module.exports = {PlanOrdersModel}

// delete referenced docs id from other schema after deleting a doc
// ref: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb


