import {
  deCodeTokenForUser,
  logger,
  convertStringArraytoArray,
} from "../lib/utils";
import { getCateroy } from "../models/category";
import BaseController from "./baseController";

var options = {
  // example input , yes negative values do work
  min: 1000,
  max: 9999,
};

class CategoryController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.creatCategory = this.creatCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.getCateroy = this.getCateroy.bind(this);
  }

  async creatCategory(req, res) {
    logger.info("creatCategory");
    const { accessToken, data } = req.body;

    const parseToken = deCodeTokenForUser(accessToken);
    if (parseToken) {
      //this.responseSuccess(res, parseToken);
      if (parseToken.payload.roles_id != 1)
        return this.responseError(
          res,
          {
            authenticated: false,
            message: "Method Not Allowed",
          },
          405
        );
      try {
        let result = await creatCategory(data);
        return this.responseSuccess(res, result);
      } catch (exception) {
        return this.responseError(res, { message: exception }, 500);
      }
    } else {
      return this.responseError(
        res,
        {
          authenticated: false,
          message: "token incorrect",
        },
        400
      );
    }
  }
  async updateCategory(req, res) {
    logger.info("updateCategory");
    const { accessToken, data } = req.body;
    const parseToken = deCodeTokenForUser(accessToken);
    if (parseToken) {
      //this.responseSuccess(res, parseToken);
      if (parseToken.payload.roles_id != 1)
        return this.responseError(
          res,
          {
            authenticated: false,
            message: "Method Not Allowed",
          },
          405
        );
      try {
        let result = await updateCategory(data);
        return this.responseSuccess(res, result);
      } catch (exception) {
        return this.responseError(res, { message: exception }, 500);
      }
    } else {
      return this.responseError(
        res,
        {
          authenticated: false,
          message: "token incorrect",
        },
        400
      );
    }
  }
  async deleteCategory(req, res) {
    logger.info("deleteCategory");
    const { accessToken, data } = req.body;
    const parseToken = deCodeTokenForUser(accessToken);
    if (parseToken) {
      //this.responseSuccess(res, parseToken);
      if (parseToken.payload.roles_id != 1)
        return this.responseError(
          res,
          {
            authenticated: false,
            message: "Method Not Allowed",
          },
          405
        );
      try {
        let result = await deleteCategory(data);
        return this.responseSuccess(res, result);
      } catch (exception) {
        return this.responseError(res, { message: exception }, 500);
      }
    } else {
      return this.responseError(
        res,
        {
          authenticated: false,
          message: "token incorrect",
        },
        400
      );
    }
  }

  async getCateroy(req, res) {
    logger.info("getCateroy");
    try {
      let result = await getCateroy();
      result.map((item) => {
        const brands = convertStringArraytoArray(item.brands);
        item.brands = brands;
      });
      return this.responseSuccess(res, result);
    } catch (error) {
      return this.responseError(
        res,
        {
          message: error,
        },
        500
      );
    }
  }
}

export default new CategoryController();
