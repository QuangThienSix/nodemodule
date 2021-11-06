import BaseController from "./baseController";
import { getTokenForUser, deCodeTokenForUser, sendMail } from "../lib/utils";
import { logger } from "../lib/utils";
import { getAll } from "../models/user_role";
import bcrypt from "bcrypt";
import appConfig from "../config/env/app.dev.json";
import rn from "random-number";
import apiConfig from "../config/api";

class UserRoleController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req, res) {
    logger.info("getAll Role");

    try {
      const user = await getAll();

      return this.responseSuccess(res, user, "getAll Role successfully");
    } catch (error) {
      return this.responseError(res, error);
    }
  }
}

export default new UserRoleController();
