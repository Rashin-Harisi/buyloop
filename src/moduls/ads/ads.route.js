const { Router } = require("express");
const adsController = require("./ads.controller");
const { upload } = require("../../common/middleware/multer");

const router = Router()

router.get('/create',adsController.createPostPage)
router.post('/create',upload.array("images",10),adsController.create)


module.exports={
    mainAdsRoutes : router
}