const { default: autoBind } = require("auto-bind");
const OptionModel = require("./options.model");

class OptionsService{
    #model
    constructor(){
        autoBind(this)
        this.#model = OptionModel
    }
    async createOtions(){
        
    }
}

module.exports = new OptionsService()