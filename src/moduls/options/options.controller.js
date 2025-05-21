const { default: autoBind } = require("auto-bind");
const optionsService = require("./options.service");

class OptionsController{
    #service
    constructor(){
        autoBind(this)
        this.#service = optionsService
    }
    async createOtions(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }   
}

module.exports = new OptionsController()