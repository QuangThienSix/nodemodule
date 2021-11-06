import BaseController from "./baseController";
import { getTokenForUser, deCodeTokenForUser, sendMail } from "../lib/utils";
import { logger } from "../lib/utils";
import { adduser_comment, getuser_comment } from "../models/user_comment";
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
class CommentController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.creatComment = this.creatComment.bind(this);
    this.getCommentProduct = this.getCommentProduct.bind(this);
  }

  async creatComment(req, res) {
    logger.info("creatComment");
    const { accessToken, data } = req.body;

    const parseToken = deCodeTokenForUser(accessToken);
    if (parseToken) {
      //this.responseSuccess(res, parseToken);

      try {
        data.bidder_name = parseToken.payload.fullname;
        data.bidder_id = parseToken.payload.user_id;
        data.created_at = getNow();
        let result = await adduser_comment(data);
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

  async getCommentProduct(req, res) {
    logger.info("getCommentProduct");
    const product_id  = req.params.product_id
    try {
      let result = await this.getuser_comment(product_id);
      console.log(result);
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

export default new CommentController();
