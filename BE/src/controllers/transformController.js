import BaseController from "./baseController";
import { getTokenForUser, deCodeTokenForUser, sendMail } from "../lib/utils";
import { logger } from "../lib/utils";
import {
  addtransform_seller,
  gettransform_seller,
  activeTransform,
} from "../models/transform_seller";
import { getNow } from "../db";
import bcrypt from "bcrypt";
import appConfig from "../config/env/app.dev.json";
import rn from "random-number";
import apiConfig from "../config/api";

var options = {
  // example input , yes negative values do work
  min: 1000,
  max: 9999,
};
class TransformController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.creatTransform = this.creatTransform.bind(this);
    this.getTransform = this.getTransform.bind(this);
  }

  async creatTransform(req, res) {
    logger.info("creatTransform");
    const { accessToken, data } = req.body;

    const parseToken = deCodeTokenForUser(accessToken);
    if (parseToken) {
      //this.responseSuccess(res, parseToken);
      if (parseToken.payload.roles_id != 1 && parseToken.payload.roles_id != 3)
        return this.responseError(
          res,
          {
            authenticated: false,
            message: "Method Not Allowed",
          },
          405
        );
      try {
        data.bidder_name = parseToken.payload.fullname;
        data.bidder_id = parseToken.payload.user_id;
        data.created_at = getNow();
        let result = await addtransform_seller(data);
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

  async getTransform(req, res) {
    try {
      logger.info("getTransform");
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
        let result = await this.gettransform_seller();
        return this.responseSuccess(res, result);
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

  async actionTransform(req, res) {
    try {
      logger.info("actionTransform");
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
        let result = await this.activeTransform(data.bidder_id, data.status);
        return this.responseSuccess(res, result);
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

export default new TransformController();
