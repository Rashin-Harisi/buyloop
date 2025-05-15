const { default: autoBind } = require("auto-bind")
const authService = require("./auth.service")
const { AuthMessage } = require("./auth.message")


class AuthController{
    #service
    constructor(){
        autoBind(this)
        this.#service = authService
    }

    async sendOTP(req,res,next){
        try {
            const {mobile} = req.body;
            await this.#service.sendOTP(mobile)
            return res.json({
                message : AuthMessage.SendOTPSuccessfulle
            })
            
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req,res,next){
        try {
            const {mobile,code} = req.body;
            const token = await this.#service.checkOTP(mobile,code)
            return res.cookie("access_token",token,{
                httpOnly: true,
                secure: process.env.ENVIRONMENT === "production"
            }).status(200).json({
                message : AuthMessage.LoginSuccessfully,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports= new AuthController()