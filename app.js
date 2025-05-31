const express = require('express')
const dotenv = require("dotenv");
const SwaggerConfig = require('./src/config/swagger.config');
const { NotFound, ErrorHandler } = require('./src/common/exception/errorHandler');
const { AllRoutes } = require('./src/routes');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require("path");


dotenv.config()
function main(){
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.SECRET_KEY_COOKIE_PARSE ))
    require("./src/config/mongoose.config")
    SwaggerConfig(app)
    app.use(express.static("public"))
    app.use(expressEjsLayouts)
    app.set("view engine","ejs")
    app.set("layout", "./layouts/panel/main.ejs")
    app.set("views", path.join(__dirname, "views"));

    
    app.use(AllRoutes)
    app.use(NotFound)
    app.use(ErrorHandler)
    app.listen(process.env.PORT,()=>{
        console.log(`Server is up on http://localhost:${process.env.PORT}`)
    })
}

main()