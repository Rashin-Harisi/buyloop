const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: false,
        default: undefined
    },
    expiresIn: {
        type: Number,
        required: false,
        default: 0,
    }
})
const userSchema = new mongoose.Schema({
    fullName:{
        type: String, 
        required: false
    },
    mobile:{
        type: String,
        required: true,
        unique: true, 
    },
    otp:{type: otpSchema},
    verifiedMobile: {
        type: Boolean,
        required: true,
        default: false,
    }
},{
    timestamps: true
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel