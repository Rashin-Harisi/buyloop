const Authorization = require('../../common/guard/authotization.guard')
const userController = require('./user.controller')


const router = require('express').Router()


router.get("/whoami", Authorization,userController.whoami)



module.exports={
    mainUserRouter : router
}