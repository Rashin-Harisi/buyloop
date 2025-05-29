const { default: autoBind } = require("auto-bind");
const CategoryModel = require("./category.model");
const OptionModel = require("../options/options.model")
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const CategoryMessage = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService {
    #model
    #optionModel
    constructor(){
        autoBind(this)
        this.#model = CategoryModel
        this.#optionModel = OptionModel
    }
    async create(CategoryData){
        if(CategoryData?.parent && isValidObjectId(CategoryData.parent)){
            const existedCategoryt = await this.findExistedCategoryById(CategoryData.parent)
            CategoryData.parent = existedCategoryt._id
            CategoryData.parents=[
                ...new Set(
                    ([existedCategoryt._id.toString()].concat(
                        existedCategoryt.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ]
        }
        if(CategoryData?.slug){
            CategoryData.slug = slugify(CategoryData.slug)
            await this.alreadyExistedCategoryBySlug(CategoryData.slug)
        }else{
            CategoryData.slug = slugify(CategoryData.name)
        }
        const category = await this.#model.create(CategoryData)
        return category

    }
    async find(){
        return await this.#model.find({parent : {$exists: false}})

    }
    async removeCategory(id){
        await this.findExistedCategoryById(id)
        await this.#optionModel.deleteMany({category: id}).then(async()=>{
            await this.#model.deleteMany({_id:id})
        })
        return true
    }
    async findExistedCategoryById(id){
        const category = await this.#model.findById(id)
        if(!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return category
    }
    async existedCategoryBySlug(slug){
        const category = await this.#model.findOne({slug})
        if(!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
            return category
    }
    async alreadyExistedCategoryBySlug(slug){
        const category = await this.#model.findOne({slug})
        if(category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExisted)
        return null
    }
}

module.exports = new CategoryService()