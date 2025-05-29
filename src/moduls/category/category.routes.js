const categoryController = require('./category.controller')
const router = require('express').Router()


router.post("/",categoryController.create)
router.get("/",categoryController.find)
router.delete("/:id",categoryController.remove)



module.exports={
    mainCategoryRouter : router
}