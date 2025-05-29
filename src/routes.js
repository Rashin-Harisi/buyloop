const {mainRouter} = require('./moduls/auth/auth.routes')
const { mainCategoryRouter } = require('./moduls/category/category.routes')
const { mainOtionRoutes } = require('./moduls/options/options.routes')
const { mainUserRouter } = require('./moduls/user/user.routes')

const router = require('express').Router()


router.use("/auth", mainRouter)
router.use("/user", mainUserRouter)
router.use("/category", mainCategoryRouter)
router.use("/options", mainOtionRoutes)



module.exports={
    AllRoutes : router
}