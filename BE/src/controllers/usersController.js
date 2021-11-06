import BaseController from "./baseController";
import {
  getTokenForUser,
  deCodeTokenForUser,
  sendMail,
  getPagingData,
  responsePaginationSuccess,
} from "../lib/utils";
import { logger } from "../lib/utils";
import {
  singleByUserName,
  updateRefreshToken,
  isValidRefreshToken,
  singleByMail,
  updateIslock,
  addUser,
  listUser,
  singleById,
  deleteUser,
  updateUser,
  updateSellerUser,
  updateBidderUser,
  updatePassUser,
  listUserId,
  updateUserId,
} from "../models/user";
import bcrypt from "bcrypt";
import appConfig from "../config/env/app.dev.json";
import rn from "random-number";
import apiConfig from "../config/api";
import { RoleAdmin } from "../constants/user_roles";
import { broadcastAll } from "../ws";
var options = {
  // example input , yes negative values do work
  min: 1000,
  max: 9999,
};
class UsersController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.listUser = this.listUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateSellerUser = this.updateSellerUser.bind(this);
    this.updateBidderUser = this.updateBidderUser.bind(this);
    this.changePassUser = this.changePassUser.bind(this);
    this.sendOTP = this.sendOTP.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async listUser(req, res) {
    broadcastAll("abc");
    logger.info("Get List Users");

    const { roles_id, user_id } = req.accessTokenPayload;
    logger.info("roles_id: ", roles_id);
    logger.info("user_id: ", user_id);
    let users = null;
    let { _page, _limit, name_like, role, _sort, _order } = req.query;
    const user_id_query = req.params.user_id;
    logger.info(
      "_limit:_page: user_id_query : name_like ",
      _limit,
      ":",
      _page,
      ":",
      name_like,
      ":",
      name_like,
      user_id_query
    );
    if (name_like === undefined) {
      name_like = "";
    }
    if (role === undefined) {
      role = "";
    }
    if (_sort === undefined) {
      _sort = "ratting";
    }
    if (_order === undefined) {
      _order = "";
    }
    if (_limit && _page) {
      // role Admin
      if (roles_id === RoleAdmin) {
        try {
          users = await listUser(name_like, role, _sort, _order);
          logger.info("Admin User: ", users);

          if (!users) {
            return responsePaginationSuccess(
              res,
              [],
              _page,
              _limit,
              "List Users successfully"
            );
          }
          _page = Number(_page);
          _limit = Number(_limit);
          const pageCount = Math.ceil(users.length / _limit);

          if (_page > pageCount) {
            _page = pageCount;
          }

          return responsePaginationSuccess(
            res,
            users,
            _page,
            _limit,
            "List Users successfully"
          );
        } catch (error) {
          logger.info("Error : ", error);
          return this.responseError(res, error, 401);
        }
      } else if (user_id) {
        try {
          users = await listUserId(user_id, name_like, role, _sort, _order);
          logger.info("User: ", users);

          if (!users) {
            return responsePaginationSuccess(
              res,
              [],
              _page,
              _limit,
              "List Users successfully"
            );
          }

          _page = Number(_page);
          _limit = Number(_limit);
          const pageCount = Math.ceil(users.length / _limit);

          if (_page > pageCount) {
            _page = pageCount;
          }

          return responsePaginationSuccess(
            res,
            users,
            _page,
            _limit,
            "List Users successfully"
          );
        } catch (error) {
          logger.info("Error Users : ", error);
          return this.responseError(res, error, 401);
        }
      }
      // No Role Admin && no UserName
      else {
        logger.info(
          "Error Users : ",
          `${username ? username : "No"} User does not exist`
        );
        return this.responseError(
          res,
          `${username ? username : "No"} User does not exist`,
          401
        );
      }
    } else if (user_id_query) {
      logger.info("user_id_query", user_id_query);
      const data = await singleById(user_id_query);
      return res.json(data);
    } else {
      return this.responseError(res, "No limit and page", 400);
    }
  }
  async deleteUser(req, res) {
    logger.info("Delete Users");

    const { user_id } = req.params;

    logger.info("user_id: ", user_id);

    const { roles_id } = req.accessTokenPayload;

    logger.info("roles_id: ", roles_id);

    let users = null;

    // role Admin
    if (roles_id === RoleAdmin && roles_id) {
      try {
        users = await deleteUser(user_id);
        return this.responseSuccess(res, users, "Delete Users successfully");
      } catch (error) {
        return this.responseError(res, "User does not exist", 400);
      }
    } else {
      return this.responseError(res, "Not Admin", 401);
    }
  }
  async updateUser(req, res) {
    logger.info("Update Users");

    const entity = req.body;

    const { user_id } = req.params;

    logger.info("user_id", user_id);

    const { roles_id } = req.accessTokenPayload;

    logger.info("roles_id: ", roles_id);

    let users = null;

    // role Admin
    if (roles_id === RoleAdmin) {
      try {
        logger.info("Update With Admin");
        users = await updateUserId(entity);
        return this.responseSuccess(res, users, "Update Users successfully");
      } catch (error) {
        return this.responseError(res, "User does not exist", 400);
      }
    } else {
      try {
        logger.info("Update With User");
        users = await updateUserId(entity);
        return this.responseSuccess(res, users, "Update Users successfully");
      } catch (error) {
        return this.responseError(res, "User does not exist", 400);
      }
    }
  }
  async addUser(req, res) {
    logger.info("Add user");
    const { username, password, fullname, address, email, islock, roles_id } =
      req.body;

    const password_hash = bcrypt.hashSync(
      password,
      appConfig.authentication.saltRounds
    );

    delete req.body.password;

    if (
      username == "" ||
      password == "" ||
      email == "" ||
      address == "" ||
      fullname == ""
    ) {
      logger.info("Data null");
      return this.responseError(
        res,
        {
          message:
            "username || password || email ||fullname || address no data",
        },
        400
      );
    }

    const entity = {
      username: username,
      password: password_hash,
      fullname: fullname,
      address: address,
      email: email,
      islock: false,
      roles_id: roles_id,
      tokenMail: "",
    };

    // check user
    const user = await singleByUserName(username, password_hash);
    if (user) {
      logger.info("same username");
      return this.responseError(
        res,
        {
          message: "same username ",
        },
        400
      );
    }
    // check mail
    const mail = await singleByMail(email);
    if (mail) {
      logger.info("same Email");
      return this.responseError(
        res,
        {
          message: "same Email ",
        },
        400
      );
    }
    // add user
    let resUser = null;
    try {
      resUser = await addUser(entity);
      return this.responseSuccess(
        res,
        {
          success: true,
          email: email,
        },
        "Add User successfully"
      );
    } catch (error) {
      logger.info("Failed add user", error);
      return this.responseError(
        res,
        {
          message: "Failed add user",
        },
        400
      );
    }
  }
  async updateSellerUser(req, res) {
    logger.info("Update Seller Users");

    const { user_id } = req.query;

    logger.info("user_id: ", user_id);

    const { roles_id } = req.accessTokenPayload;

    logger.info("roles_id: ", roles_id);

    let users = null;

    // role Admin
    if (roles_id === RoleAdmin && user_id) {
      try {
        users = await updateSellerUser(user_id);
        return this.responseSuccess(
          res,
          users,
          "Update Seller Users successfully"
        );
      } catch (error) {
        return this.responseError(res, "User does not exist", 400);
      }
    } else {
      return this.responseError(res, "Not Admin", 401);
    }
  }
  async updateBidderUser(req, res) {
    logger.info("Update Bidder Users");

    const { user_id } = req.query;

    logger.info("user_id: ", user_id);

    const { roles_id } = req.accessTokenPayload;

    logger.info("roles_id: ", roles_id);

    let users = null;

    // role Admin
    if (roles_id === RoleAdmin && user_id) {
      try {
        users = await updateBidderUser(user_id);
        return this.responseSuccess(
          res,
          users,
          "Update Seller Users successfully"
        );
      } catch (error) {
        return this.responseError(res, "User does not exist", 400);
      }
    } else {
      return this.responseError(res, "Not Admin", 401);
    }
  }
  async changePassUser(req, res) {
    logger.info("Change Password Users");

    const { oldpassword, newpassword } = req.body;

    logger.info("Password: ", password);

    const { roles_id, user_id } = req.accessTokenPayload;

    logger.info("roles_id :  user_id", roles_id, user_id);

    const user = await singleById(user_id);

    if (!bcrypt.compareSync(oldpassword, user.password)) {
      return this.responseError(
        res,
        {
          authenticated: false,
          message: "Password is incorrect",
        },
        400
      );
    }

    const password_hash = bcrypt.hashSync(
      newpassword,
      appConfig.authentication.saltRounds
    );

    try {
      const users = await updatePassUser(user_id, password_hash);
      return this.responseSuccess(res, users, "Update Password successfully");
    } catch (error) {
      return this.responseError(res, "User does not exist", 400);
    }
  }
  async sendOTP(req, res) {
    logger.info("sendOTP");
    const { email } = req.body;
    const user = await singleByMail(email);
    if (user) {
      try {
        {
          // send Email
          logger.info("Send Email");
          const html = `Hi ${fullname},
        <br/>
        Chúng tôi cung cấp mã OTP.
        Email: ${email}
        <br/> <br/>
        Mã Xác Nhận: <b>${tokenMail}</b>
        Link Xác nhận : <a href="http://localhost:${apiConfig.port}/login/verify">http://localhost:${apiConfig.port}/login/verify</a>
        `;
          await sendMail("phamquangthien.it@gmail.com", email, "[OTP]", html);
        }
        return this.responseSuccess(
          res,
          {
            success: true,
            email: email,
          },
          "Register successfully"
        );
      } catch (error) {
        return this.responseError(
          res,
          {
            message: "Failed send Email",
          },
          400
        );
      }
    }
  }
  async forgotPassword(req, res) {
    logger.info("forgotPassword");
    const { email, tokenMail, newpassword } = req.body;

    const user = await singleByMail(email);
    if (user) {
      if (user.tokenMail === tokenMail) {
        logger.info("token === user.tokenMail");
        const password_hash = bcrypt.hashSync(
          newpassword,
          appConfig.authentication.saltRounds
        );
        await updatePassUser(user.user_id, password_hash);
        return this.responseSuccess(res, user, "Forgot successfully");
      } else {
        logger.info("Invalid token");
        return this.responseError(res, {
          authenticated: false,
          message: `${user.email}: Invalid token`,
        });
      }
    } else {
      logger.info("Invalid Email");
      return this.responseError(res, {
        authenticated: false,
        message: `${user.email}: Invalid Email`,
      });
    }
  }
}

export default new UsersController();
