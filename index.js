const express = require("express");
const cors = require('cors');
const { dbConnect } = require("./src/utils/db");
const { env_init } = require("./src/utils/env_init");
const { routeSetting } = require("./src/routes/routeSetting");
require('dotenv').config();
// const  = require();

const port = process.env.PORT || 5000;
const app = express();


app.get("/",(req,res)=>{
    res.send("Beyond app.....")
})



async function startServer() {
    // initialize env and connect to DB
    const env = env_init();
    const isConnected = await dbConnect();
    if (!isConnected) {
        console.log("Failed to run app due to bad database connection.....");
        return;
    }

    // cors allow, json parse
    app.use(cors({origin:[env.frontend_uri]}));
    app.use(express.json());
    
    // setup the routes 
    routeSetting(app);

    // listen the app to a port
    app.listen(port,()=>{
        console.log(`Xendoo Server Running at ${port}`);
    })
}

startServer();

