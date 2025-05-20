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
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    parents: {
        type: [Schema.Types.ObjectId],
        default: [],
        required: false,
    }
},{
    toJSON: {virtuals: true},
    versionKey: false,
    id: false
})

CategorySchema.virtual("children",{
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})

function autoPopulation(next){
    if (this.op !== 'find' && this.op !== 'findOne') return next();
    this.populate([{path: "children"}])
    next()
}
CategorySchema.pre("find",autoPopulation).pre("findOne",autoPopulation)
const CategoryModel = model("category",CategorySchema)

module.exports = CategoryModel
