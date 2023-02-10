
const ObjectId = require('mongoose').Types.ObjectId;

function errorFormatter(error) {
    // console.log(error.name);
    if (error.name === 'ValidationError') {
        const err = {};
        Object.keys(error.errors).forEach(key =>{
            // console.log(error.errors[key].message);
            err[key] = error.errors[key].message;
        })
        return err;
    }else if(error.code === 11000){
        const key = Object.keys(error.keyValue)[0]
        return {[key]: `${key} must be unique`}
    }else{
        return error;
    }
    
}


function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}


module.exports = {
    errorFormatter,
    isValidObjectId
}