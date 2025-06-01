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
    async create(req,res,next){
        try {
            let{slug} = req.query
            let showBack = false;
            let match = {parent: null}
            if(slug){
                slug = slug.trim();
                const category= await CategoryModel.findOne({slug})
                if(!category) throw new createHttpError.NotFound("Category with this slug is not found.")
                showBack= true
                match ={
                    parent : category._id
                }
            }
            const categories = await CategoryModel.aggregate([{
                $match : match
            }])
            res.render("./pages/panel/create-post.ejs",{categories,showBack})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AdsController()