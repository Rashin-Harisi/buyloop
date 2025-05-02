const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require("swagger-ui-express")
const path = require("path");



function SwaggerConfig(app){
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition:{
            openapi: '3.0.1',
            info:{
                title: "BUYLOOP - Backend",
                description: "A Backend project",
                version: "1.0.0",
            }
        },
        apis:[path.join(process.cwd(), "src/moduls/**/*.swagger.js")],
    })
    const swagger = swaggerUI.setup(swaggerDocument,{})
    app.use("/docs", swaggerUI.serve, swagger)
}

module.exports = SwaggerConfig