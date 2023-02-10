const { default: mongoose } = require("mongoose");

// name, user

const fileSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "File Name is required"],
            unique:[true, "File name already exist"],
            // match: [/^[a-zA-Z]+$/,"Name is invalid"],
            lowercase: true,
            trim: true,
            // maxLength: [250,"Maximum 50 characters are allowed"],
            // minLength: [252,"Minimum 2 characters are required"]
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "User id is required"],
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Companies",
            required: [true, "Company ID is required"],
        },
        category:{
            type: String,
            required: [true, "File Name is required"],
            enum:{
                values: ['bookkeeping_files','tax_files'],
                message: `File category must be bookkeeping_files or tax_files`
            },
            // validate:{
            //     validator: (value)=>{
            //         console.log(value,"Validating ctg", );
            //         return true;
            //     },
            //     message:"{VALUE} is not a valid category. It must be 'bookkeeping_files' or 'tax_files'"
            // }
        },
        year:{
            type: Number,
            required:[true,"File's year is required"],
        },
    },
    {
        timestamps:{createdAt:true,updatedAt:true}
    }
)


const FileModel = mongoose.model("Files",fileSchema);

module.exports = { FileModel}

