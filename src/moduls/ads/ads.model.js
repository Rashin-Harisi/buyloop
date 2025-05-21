const {Schema,Types, model} = require("mongoose")

const AdsSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: "Category", required: true},
    province: {type: String, required: false},
    city: {type: String, required: false},
    district: {type: String, required: false},
    address: {type: String, required: false},
    coordinate: {type: [Number], required: true},
    images: {type: [String], required: false, default: []},
})

const AdsModel = model("ad", AdsSchema)
module.exports = AdsModel