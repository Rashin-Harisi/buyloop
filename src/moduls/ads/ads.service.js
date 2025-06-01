const { default: autoBind } = require("auto-bind")
const AdsModel = require("./ads.model")
const CategoryModel = require('../category/category.model')

class AdsService {
    #model
    #categoryModel
    constructor() {
        autoBind(this)
        this.#model = AdsModel
        this.#categoryModel = CategoryModel
    }
    async create(){
        

    }
}

module.exports = new AdsService()