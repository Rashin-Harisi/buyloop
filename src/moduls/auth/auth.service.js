const { default: autoBind } = require("auto-bind")
const userModel = require("../user/user.model")
const { randomInt } = require("crypto")
const createHttpError = require("http-errors")
const { AuthMessage } = require("./auth.message")

class AuthService{
    #model
    constructor(){
        autoBind(this)
        this.#model = userModel
    }
    async sendOTP(mobile){
        const user = await this.#model.findOne({mobile})
        const now = new Date().getTime();
        const otp ={
            code : randomInt(10000,99999),
            expiresIn: now + 1000*60*2 ,
        }
        if(!user){
            const newUser = await this.#model.create({mobile,otp})
            return newUser
        }
        if(user.otp && user.otp.expritesIn > now ){
            throw new createHttpError.BadRequest(AuthMessage.OTPcodeNotExpired)
        }
        user.otp = otp;
        await user.save();
        return user;
    }
    async checkOTP(mobile,code){

    }
}

module.exports = new AuthService()