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
            expiresIn: now + 1000 * 60 * 2 ,
        }
        console.log(now,otp)
        if(!user){
            const newUser = await this.#model.create({mobile,otp})
            return newUser
        }
        if(user.otp && user.otp.expiresIn > now ){
            throw new createHttpError.BadRequest(AuthMessage.OTPcodeNotExpired)
        }
        user.otp = otp;
        await user.save();
        return user;
    }
    async checkOTP(mobile,code){
        const user = await this.checkExistingMobileNumber(mobile)
        const now = new Date().getTime();
        if(user?.otp?.expiresIn < now) throw new createHttpError.NotFound(AuthMessage.OTPCodeIsExpired)
        if(user?.otp?.code !== code) throw new createHttpError.NotFound(AuthMessage.OTPCodeIsIncorrect)
        if(!user.verifiedMobile){
            user.verifiedMobile = true;
            await user.save()
        }
        return user;
    }
    async checkExistingMobileNumber(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createHttpError.NotFound(AuthMessage.UserNotFound)
        return user
    }
}

module.exports = new AuthService()