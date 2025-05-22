const { Router } = require("express");
const optionsController = require("./options.controller");

const router = Router()

router.post("/", optionsController.createOtions)
router.get("/", optionsController.find)
router.get("/by-category/:categoryId", optionsController.findByCategoryId)


module.exports = {
    mainOtionRoutes : router
}
