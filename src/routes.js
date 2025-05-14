const {mainRouter} = require('./moduls/auth/auth.routes')

const router = require('express').Router()


router.use("/auth", mainRouter)

module.exports={
    AuthRoutes : router
}