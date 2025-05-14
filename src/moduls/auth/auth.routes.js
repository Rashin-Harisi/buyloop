const authController = require('./auth.controller')

const router = require('express').Router()


router.post("/send-otp", authController.sendOTP)
router.post("/check-otp", authController.checkOTP)


module.exports={
    mainRouter : router
}