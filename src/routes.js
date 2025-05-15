const {mainRouter} = require('./moduls/auth/auth.routes')
const { mainUserRouter } = require('./moduls/user/user.routes')

const router = require('express').Router()


router.use("/auth", mainRouter)
router.use("/user", mainUserRouter)


module.exports={
    AuthRoutes : router
}