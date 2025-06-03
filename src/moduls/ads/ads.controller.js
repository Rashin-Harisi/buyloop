const { default: autoBind } = require("auto-bind")
const adsService = require("./ads.service")
const CategoryModel = require("../category/category.model")
const createHttpError = require("http-errors")


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
            if(slug){
                slug = slug.trim();
                const category= await CategoryModel.findOne({slug})
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
            res.render("./pages/panel/create-post.ejs",{categories,showBack,options,
                google_api_key: process.env.GOOGLE_MAP_API_KEY
            })
        } catch (error) {
            next(error)
        }
    }
    async create(req,res,next){
        try {
           console.log(req.body) 
           res.json("data get susseccfully")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdsController()