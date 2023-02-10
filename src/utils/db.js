const { default: mongoose } = require("mongoose");
const { env } = require("./env_init");

async function dbConnect() {
    let isConnected = false;
    if (!env.mongo_uri) {
        console.log("Missing mongoDB url!");
        return isConnected;
    }
    
    // When strict option is set to true, Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved. this option, Mongoose v7 to false by default. 
    mongoose.set('strictQuery',true); 
    await mongoose.connect(env.mongo_uri,{
        dbName: "Beyond",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("DB connection successfull");
        isConnected = true
    })
    .catch(err=>{
        console.log(err);
    })
    return isConnected;
}

module.exports = {dbConnect}