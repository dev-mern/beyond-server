const { default: mongoose } = require("mongoose");

const companySchema = mongoose.Schema(
    {
        
        name:{
            type: String,
            lowercase: true,
            trim: true,
            maxLength: [100,"Maximum 100 characters are allowed"],
            minLength: [2,"required minimum 2 characters"]
        },
        email:{
            type: String,
            lowercase: true,
            required: [true, "Email can't be blank"], 
            // match: [/\S+@\S+\.\S+/, 'Email is invalid'], 
            validate:{
                validator: function(emailValue){
                    const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
                    return emailRegex.test(emailValue);
                },
                message:"{VALUE} is not a valid email"
            }
            
        },
        phone:{
            type: String,
            trim: true,
        },
        ein:{
            type: String,
            trim: true,
        },
        type:{
            type: String,
            required: [true, "Company type is required"], 
            trim: true,
        },
        sell:{
            type: String,
            trim: true
        },
        established:{
            type: Date,
            required: [true,"Company started date is required"],
        },
        address:{
            address_1:{
                type: String,
                required: [true,"Address is required"],
                trim: true,
                lowercase: true
            },
            address_2:{
                type: String,
                lowercase: true,
                trim: true
            },
            city:{
                type: String,
                required: [true,"City is required"],
                lowercase: true,
                trim: true
            },
            state:{
                type: String,
                required: [true,"State is required"],
                lowercase: true,
                trim: true
            },
            zip_code:{
                type: String,
                required: [true,"State is required"],
                lowercase: true,
                trim: true
            },
            country:{
                type: String,
                required: [true,"State is required"],
                lowercase: true,
                trim: true
            }
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Users",
            required: [true,"User id is required"],
        },
    },
    {timestamps:{createdAt:true,updatedAt:true}}
)

const CompanyModel = mongoose.model("Companies",companySchema);

module.exports = {CompanyModel}

// delete referenced docs id from other schema after deleting a doc
// ref: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb


