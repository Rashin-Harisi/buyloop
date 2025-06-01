const { mainAdsRoutes } = require('./moduls/ads/ads.route')
const {mainRouter} = require('./moduls/auth/auth.routes')
const { mainCategoryRouter } = require('./moduls/category/category.routes')
const { mainOtionRoutes } = require('./moduls/options/options.routes')
const { mainUserRouter } = require('./moduls/user/user.routes')

const router = require('express').Router()


router.use("/auth", mainRouter)
router.use("/user", mainUserRouter)
router.use("/category", mainCategoryRouter)
router.use("/options", mainOtionRoutes)
router.use("/ads", mainAdsRoutes)


router.get('/panel', (req,res)=>{
    res.render("./pages/panel/dashbord.ejs")
})
router.get('/', (req,res)=>{
    res.locals.layout = "./layouts/website/main.ejs"
    res.render("./pages/home/main.ejs")
})
router.get('/auth/login', (req,res)=>{
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/main.ejs")
})
module.exports={
    AllRoutes : router
}