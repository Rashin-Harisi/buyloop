const express = require('express')
const dotenv = require("dotenv");
const SwaggerConfig = require('./src/config/swagger.config');
const { NotFound, ErrorHandler } = require('./src/common/exception/errorHandler');
const { AuthRoutes } = require('./src/routes');
const cookieParser = require('cookie-parser');


dotenv.config()
function main(){
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSE ))
    require("./src/config/mongoose.config")
    SwaggerConfig(app)
    app.get('/', (req,res)=>{
        res.send("Hi from Backend")
    })
    app.use(AuthRoutes)
    app.use(NotFound)
    app.use(ErrorHandler)
    app.listen(process.env.PORT,()=>{
        console.log(`Server is up on http://localhost:${process.env.PORT}`)
    })
}

main()