const {Schema, model} = require("mongoose")


const CategorySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    slug: {
        type: String,
        index: true,
        required: true,
    },
    icon: {
        type : String,
        required: true,
    },
    parenst: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    parenst: {
        type: [Schema.Types.ObjectId],
        default: [],
        required: false,
        ref: "Category"
    }
},{
    toJSON: {virtuals: true},
    versionKey: false,
    id: false
})

CategorySchema.virtual("children",{
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
})

const CategoryModel = model("category",CategorySchema)

module.exports = CategoryModel
