const { default: autoBind } = require("auto-bind")
const AdsModel = require("./ads.model")
const CategoryModel = require('../category/category.model')
const OptionModel = require('../options/options.model')

class AdsService {
    #model
    #categoryModel
    #optionModel
    constructor() {
        autoBind(this)
        this.#model = AdsModel
        this.#categoryModel = CategoryModel
        this.#optionModel = OptionModel
    }
    async getAllOptionsOfaCategory(id){
        const options = await this.#optionModel.find({category:id})
        return options
    }
}

module.exports = new AdsService()