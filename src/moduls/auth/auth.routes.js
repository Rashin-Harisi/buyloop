const authController = require('./auth.controller')

const router = require('express').Router()


router.post("/send-otp", authController.sendOTP)

module.exports={
    mainRouter : router
}