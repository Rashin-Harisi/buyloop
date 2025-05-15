const { default: autoBind } = require("auto-bind")
const userModel = require("./user.model")
const { randomInt } = require("crypto")
const createHttpError = require("http-errors")
const { AuthMessage } = require("./user.message")
const jwt = require('jsonwebtoken')

class UserService{
    #model
    constructor(){
        autoBind(this)
        this.#model = userModel
    } 
}

module.exports = new UserService()