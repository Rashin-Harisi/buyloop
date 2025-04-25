const express = require('express')
const dotenv = require("dotenv")

dotenv.config()
function main(){
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    require("./src/config/mongoose.config")
    app.get('/', (req,res)=>{
        res.send("Hi from Backend")
    })

    app.listen(process.env.PORT,()=>{
        console.log(`Server is up on http://localhost:${process.env.PORT}`)
    })
}

main()