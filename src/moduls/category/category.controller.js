const { default: autoBind } = require("auto-bind");
const categoryService = require("./category.service");
const HttpCodes = require("http-codes");
const CategoryMessage = require("./category.message");

class CategoryController {
    #service
    constructor(){
        autoBind(this)
        this.#service = categoryService
    }

    async create (req,res,next){
        try {
            const {name,slug,icon,parent}  = req.body
            await this.#service.create({name,slug,icon,parent})
            return res.status(HttpCodes.CREATED).json({
                message : CategoryMessage.Created
            })        
        } catch (error) {
            next(error)
        }
    }
    async find (req,res,next){
        try {
            const categories= await this.#service.find()
            return res.status(HttpCodes.OK).json(categories)        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CategoryController()