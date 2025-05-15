const Authorization = require('../../common/guard/authotization.guard')
const authController = require('./auth.controller')

const router = require('express').Router()


router.post("/send-otp", authController.sendOTP)
router.post("/check-otp", authController.checkOTP)
router.get("/logout", Authorization , authController.logout)



module.exports={
    mainRouter : router
}