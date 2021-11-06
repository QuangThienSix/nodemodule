import BaseController from "./baseController";
import { getTokenForUser, deCodeTokenForUser, sendMail } from "../lib/utils";
import { logger } from "../lib/utils";
import { adduser_WatchList, getuser_WatchList } from "../models/watch_list";
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
class WatchListController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.creatWatchList = this.creatWatchList.bind(this);
    this.getWatchListProduct = this.getWatchListProduct.bind(this);
  }

  async creatWatchList(req, res) {
    logger.info("creatWatchList");
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
        let result = await adduser_WatchList(data);
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

  async getWatchListProduct(req, res) {
    logger.info("getWatchListProduct");
    const {bidder_id } = req.params
    try {
      logger.info("creatWatchList");
      const { accessToken, data } = req.body;

      const parseToken = deCodeTokenForUser(accessToken);
      if (parseToken) {
        //this.responseSuccess(res, parseToken);
        if (
          parseToken.payload.roles_id != 1 &&
          parseToken.payload.roles_id != 3
        )
          return this.responseError(
            res,
            {
              authenticated: false,
              message: "Method Not Allowed",
            },
            405
          );
        let result = await this.getuser_WatchList(bidder_id);
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

export default new WatchListController();
