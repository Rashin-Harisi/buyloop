const express = require('express')
const dotenv = require("dotenv");
const SwaggerConfig = require('./src/config/swagger.config');
const { NotFound, ErrorHandler } = require('./src/common/errorHandler');
const { mainRouter } = require('./src/moduls/auth/auth.routes');

dotenv.config()
function main(){
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    require("./src/config/mongoose.config")
    SwaggerConfig(app)
    app.get('/', (req,res)=>{
        res.send("Hi from Backend")
    })
    app.use(mainRouter)
    app.use(NotFound)
    app.use(ErrorHandler)
    app.listen(process.env.PORT,()=>{
        console.log(`Server is up on http://localhost:${process.env.PORT}`)
    })
}

main()