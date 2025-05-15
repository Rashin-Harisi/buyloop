const createHttpError = require("http-errors");
const authotizationMessage = require("../message/auth.message");
const jwt = require("jsonwebtoken");
const userModel = require("../../moduls/user/user.model");
require('dotenv').config()

const Authorization = async(req,res,next)=>{
    try {
        const token = req?.cookies?.access_token;
        if(!token) throw new createHttpError.Unauthorized(authotizationMessage.Login)
        const data = jwt.verify(token,process.env.SECRET_KEY_JWT)
        if(typeof data === "object" && "id" in data){
            const user = await userModel.findById(data.id,{accessToken : 0, otp : 0, __v :0 , verifiedMobile: 0, updatedAt: 0}).lean()
            if(!user){
                throw new createHttpError.Unauthorized(authotizationMessage.NotFoundAccount)
            }
            req.user = user;
            return next()
        }
        throw new createHttpError.Unauthorized(authotizationMessage.TokenInvalid)
    } catch (error) {
        next(error)
    }

}

module.exports = Authorization