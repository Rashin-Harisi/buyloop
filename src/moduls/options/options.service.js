const { default: autoBind } = require("auto-bind");
const OptionModel = require("./options.model");
const createHttpError = require("http-errors");
const OptionsMessage = require("./options.message");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionsService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }
  async find() {
    const allOptions = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate("category");
    return allOptions;
  }
  async findById(id) {
    return await this.checkOptionById(id);
  }
  async findByCategoryId(categoryId) {
    return await this.#model
      .find({ category: categoryId }, { __v: 0 })
      .populate("category");
  }
  async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
          $addFields: {
              categorySlug: "$category.slug",
              categoryName: "$category.name",
              categoryIcon: "$category.icon",
            },
        },
        {
          $project: {
            category: 0,
            __v: 0,
          },
        },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    return options;
  }
  async createOtions(OptionData) {
    const category = await this.#categoryService.findExistedCategoryById(OptionData.category);
    OptionData.category = category._id;
    OptionData.key = slugify(OptionData.key, {
      replacement: "_",
      trim: true,
      lower: true,
    });
    await this.alreadyExistCategoryandKey(OptionData.key, category._id);
    if (OptionData?.enum && typeof OptionData.enum === "string") {
        OptionData.enum = OptionData.enum.split(",");
    } else if (!Array.isArray(OptionData.enum)) {
        OptionData.enum = [];
    }
    if(isTrue(OptionData?.required)) OptionData.required = true
    if(isFalse(OptionData?.required)) OptionData.required = false
    const option = this.#model.create(OptionData);
    return option;
  }
  async removeById(id){
    await this.checkOptionById(id)
    return await this.#model.deleteOne({_id:id})
  }
  async checkOptionById(id) {
    const option = await this.#model.findById(id, { __v: 0 });
    if (!option) throw new createHttpError.NotFound(OptionsMessage.NotFound);
    return option;
  }
  async alreadyExistCategoryandKey(key, category) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist)
      throw new createHttpError.Conflict(OptionsMessage.AlreadyExisted);
    return null;
  }
}

module.exports = new OptionsService();
