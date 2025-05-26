const { Router } = require("express");
const optionsController = require("./options.controller");

const router = Router()

router.post("/", optionsController.createOtions)
router.get("/", optionsController.find)
router.get("/by-category/:categoryId", optionsController.findByCategoryId)
router.get("/by-category-slug/:slug", optionsController.findByCategorySlug)
router.get("/:id", optionsController.findById)
router.delete("/:id", optionsController.removeById)




module.exports = {
    mainOtionRoutes : router
}
