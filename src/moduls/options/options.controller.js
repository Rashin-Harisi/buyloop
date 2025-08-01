const { default: autoBind } = require("auto-bind");
const optionsService = require("./options.service");
const HttpCodes = require("http-codes");
const OptionsMessage = require("./options.message");

class OptionsController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionsService;
  }
  async createOtions(req, res, next) {
    try {
      const { title, key, enum: list, guid, type, category,required } = req.body;
      await this.#service.createOtions({
        title,
        key,
        enum: list,
        guid,
        type,
        category,
        required
      });
      return res.status(HttpCodes.CREATED).json({
        message: OptionsMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const {id} = req.params 
      const option = await this.#service.findById(id)
      res.json(option)
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const {id} = req.params 
      await this.#service.removeById(id)
      res.json({
        message: OptionsMessage.DeleteOption
      })
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
      const {categoryId} = req.params 
      const option = await this.#service.findByCategoryId(categoryId)
      res.json(option)
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {
    try {
      const {slug} = req.params 
      const option = await this.#service.findByCategorySlug(slug)
      res.json(option)
    } catch (error) {
      next(error);
    }
  }
  async updateOption(req, res, next) {
    try {
      const {id} = req.params 
      const { title, key, enum: list, guid, type, category,required } = req.body;
      await this.#service.upateOtipn(id,{
        title,
        key,
        enum: list,
        guid,
        type,
        category,
        required
      });
      return res.status(HttpCodes.CREATED).json({
        message: OptionsMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionsController();
