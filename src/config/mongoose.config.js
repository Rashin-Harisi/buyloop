const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGOOS_URL).then(()=>{
    console.log("Connected to DB")
}).catch((error)=>{
    console.log( error?.message ?? "Somthing went wrong in connection to DB!" )
})