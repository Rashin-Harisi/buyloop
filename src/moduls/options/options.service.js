const { default: autoBind } = require("auto-bind");
const OptionModel = require("./options.model");
const CategoryModel = require ("../category/category.model");
const createHttpError = require("http-errors");
const OptionsMessage = require("./options.message");
const { default: slugify } = require("slugify");

class OptionsService{
    #model
    #categoryModel
    constructor(){
        autoBind(this)
        this.#model = OptionModel
        this.#categoryModel = CategoryModel
    }
    async find(){
        const allOptions = await this.#model.find({},{__v: 0},{sort : {_id : -1}}).populate("category")
        return allOptions
    }
    async createOtions(OptionData){
        const category = await this.checkCategoryById(OptionData.category)
        OptionData.category =category._id;
        OptionData.key = slugify(OptionData.key, {replacement:"_",trim: true,lower: true})
        await this.alreadyExistCategoryandKey(OptionData.key , category._id)
        if(OptionData?.enum && typeof OptionData.enum === "string"){
            OptionData.enum = OptionData.enum.split(",")
        }else if(!Array.isArray(OptionData.enum)){
            OptionData.enum = []
        }
        const option = this.#model.create(OptionData)
        return option
    }
    async checkCategoryById(id){
        const category = await this.#categoryModel.findById(id)
        if(!category) throw new createHttpError.NotFound(OptionsMessage.NotFound)
        return category
    }
    async alreadyExistCategoryandKey(key,category){
        const isExist = await this.#categoryModel.findOne({category,key})
        if(isExist) throw new createHttpError.Conflict(OptionsMessage.AlreadyExisted)
        return null
    }
}

module.exports = new OptionsService()