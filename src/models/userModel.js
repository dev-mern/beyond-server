const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
    {
        fname:{
            type: String,
            require: [true,"First name is required"],
            match: [/^[a-zA-Z0-9]+$/, 'First name is invalid'],
            lowercase: true,
            trim: true,
            maxLength: [100,"Maximum 100 characters are allowed"],
            minLength: [2,"required minimum 2 characters"]
        },
        lname:{
            type: String,
            require: [true,"Last name is required"],
            match: [/^[a-zA-Z0-9]+$/, 'Last name is invalid'],
            lowercase: true,
            trim: true,
            maxLength: [100,"Maximum 100 characters are allowed"],
            minLength: [2,"required minimum 2 characters"]
        },
        email:{
            type: String,
            lowercase: true,
            unique: [true,"Email already exist"],
            required: [true, "Email can't be blank"], 
            // match: [/\S+@\S+\.\S+/, 'Email is invalid'], 
            validate:{
                validator: function(emailValue){
                    const emailRegex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
                    return emailRegex.test(emailValue);
                },
                message:"{VALUE} is not a valid email",
            }
        },
        role:{
            type: String,
            required: [true, "Role is required"], 
            enum:{
                values: ["user","admin"],
                message: "User's role must be either 'user' or'admin'!"
            },
            default: "user",
        },
        mobile:{
            type: String,
            required: [true, "Phone number is required"], 
            trim: true,
        },
        password:{
            type: String,
            trim: true,
            required: [true, "Password is required"], 
            // validate:{
            //     validator: validatePasswordFn,
            //     message:"Password must be at least 1 digit, 1 lowercase character, 1 uppercase character, 1 special character"
            // },
            // minLength:[8,"Password must be at least 8 characters"],
            // maxLength:[32,"Maximum 32 charactes are allowed"],
        },
        active:{
            type: Boolean,
            required:[true,"Action is required"],
            default: false
        },
        verified:{
            type: Boolean,
            required:[true,"Action is required"],
            default: false
        },
        verificationCode:{
            type: Number,
            required:[false,"Action is required"]
        },
        company:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Company",
            default:[]
        }],
        referral_id:{
            type: String,
            unique: [true,"Referral id must be unique"],
            required: [true,"Referral id is missing"]
        },
        referenced_by:{
            type: String
        }
    },
    {
        timestamps:{createdAt:true,updatedAt:true}
    }
)


const UserModel = mongoose.model("Users",userSchema);



// password validation
function validatePasswordFn(pass){
    console.log(pass);
    // const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    return regex.test(pass);
}

module.exports = {UserModel}


/*
// remove/delete referenced docs
// ref: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb


... 

const PersonSchema = new mongoose.Schema({
  name: {type: String},
  assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}]
});

mongoose.model('Person', PersonSchema);

.... 

const AssignmentSchema = new mongoose.Schema({
  name: {type: String},
  person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'}
});

mongoose.model('Assignment', AssignmentSchema)
...

PersonSchema.pre('deleteOne', function (next) {
  const personId = this.getQuery()["_id"];
  mongoose.model("Assignment").deleteMany({'person': personId}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log('success');
      next();
    }
  });
});

Invoking deleteOne function somewhere in service:
    try {
    const deleted = await Person.deleteOne({_id: id});
    } catch(e) {
    console.error(`[error] ${e}`);
    throw Error('Error occurred while deleting Person');
    }

*/