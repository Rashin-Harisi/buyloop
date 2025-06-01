const { Router } = require("express");
const adsController = require("./ads.controller");

const router = Router()

router.get('/create',adsController.create)

module.exports={
    mainAdsRoutes : router
}