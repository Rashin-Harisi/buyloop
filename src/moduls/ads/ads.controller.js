const { default: autoBind } = require("auto-bind")
const adsService = require("./ads.service")
const CategoryModel = require("../category/category.model")
const createHttpError = require("http-errors")
const { Types } = require("mongoose")
const HttpCodes = require("http-codes");
const AdsMessage = require("./ads.messages")
const { getDetailedAddress, removeItemsFromATarget } = require("../../common/utils/functions")


class AdsController {
    #service
    constructor() {
        autoBind(this)
        this.#service = adsService
    }
    async createPostPage(req,res,next){
        try {
            let{slug} = req.query
            let showBack = false;
            let match = {parent: null}
            let options;
            let category;
            if(slug){
                slug = slug.trim();
                category= await CategoryModel.findOne({slug})
                if(!category) throw new createHttpError.NotFound("Category with this slug is not found.")
                options = await this.#service.getAllOptionsOfaCategory(category._id) 
                if(options.length === 0 ) options = null
                showBack= true
                match ={
                    parent : category._id
                }
            }
            const categories = await CategoryModel.aggregate([{
                $match : match
            }])
            res.render("./pages/panel/create-post.ejs",{categories,showBack,options,category : category?._id.toString(),
                google_api_key: process.env.GOOGLE_MAP_API_KEY
            })
        } catch (error) {
            next(error)
        }
    }
    async create(req,res,next){
        try {
            const images = req?.files?.map(image => image?.path?.slice(7))
           const {lat,lng,title,description,categoryId} = req.body
           const {complitedAddress,address,country,city,district} = await getDetailedAddress(lat,lng)
           const options = removeItemsFromATarget(req.body,["lat","lng","title","description","categoryId"])
           await this.#service.createAd({
            title,
            description,
            complitedAddress,
            address,
            city,
            country,
            district,
            coordinate:[lat,lng], 
            category: new Types.ObjectId(categoryId),
            images,
            options
           })
           return res.status(HttpCodes.CREATED).json({
            message : AdsMessage.Create
        })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdsController()