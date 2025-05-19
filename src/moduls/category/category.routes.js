const categoryController = require('./category.controller')
const router = require('express').Router()


router.post("/",categoryController.create)

module.exports={
    mainCategoryRouter : router
}