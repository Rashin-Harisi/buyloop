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
      const { title, key, enum: list, guid, type, category } = req.body;
      await this.#service.createOtions({
        title,
        key,
        enum: list,
        guid,
        type,
        category,
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
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionsController();
