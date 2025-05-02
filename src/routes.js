const authRouters = require('./moduls/auth/auth.routes')

const router = require('express').Router()


router.post("/auth", authRouters)

module.exports={
    AuthRoutes : router
}