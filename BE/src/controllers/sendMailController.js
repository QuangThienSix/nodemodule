import BaseController from "./baseController";
import { getTokenForUser, deCodeTokenForUser, sendMail } from "../lib/utils";
import { logger } from "../lib/utils";
import {
  singleByUserName,
  updateRefreshToken,
  isValidRefreshToken,
  singleById,
  updateIslock,
  addUser,
} from "../models/user";
import bcrypt from "bcrypt";
import appConfig from "../config/env/app.dev.json";
import rn from "random-number";

class SendMailController extends BaseController {
  constructor() {
    super();
    // pinning context, when used in routers
    this.sendPriceSuccess = this.sendPriceSuccess.bind(this);
    this.winAuctionSuccess = this.winAuctionSuccess.bind(this);
  }
  async sendPriceSuccess(req, res) {
    logger.info("Send Price Success");
    const { userIdSel, userIdBid, userIdBidOld, sapham } = req.body;
    const userSel = await singleById(userIdSel);
    const userBid = await singleById(userIdBid);
    const userBidOld = await singleById(userIdBidOld);

    try {
      {
        // send Email
        logger.info("Send Email");
        const html = `Hi ${fullname},
        <br/>
        Chúng tôi gửi thông báo đến bạn sản phẩm ${sapham} này đã có người ra giá mới.
        Giá hiện tại: ${sapham.price}
        <br/> <br/>
        `;
        await sendMail(
          appConfig.Mail.Gmail_USER,
          userSel.email,
          "[Auction]",
          html
        );
        await sendMail(
          appConfig.Mail.Gmail_USER,
          userBid.email,
          "[Auction]",
          html
        );
        await sendMail(
          appConfig.Mail.Gmail_USER,
          userBidOld.email,
          "[Auction]",
          html
        );
      }
      return this.responseSuccess(
        res,
        {
          success: true,
          userSel: userSel.email,
          userBid: userBid.email,
          userBidOld: userBidOld.email,
        },
        "Send Mail successfully"
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
  async winAuctionSuccess(req, res) {
    logger.info("Send Price Success");
    const { userIdSel, userIdBid, sapham } = req.body;
    const userSel = await singleById(userIdSel);
    const userBid = await singleById(userIdBid);

    try {
      {
        // send Email
        logger.info("Send Email");
        const html = `Hi ${fullname},
        <br/>
        Chúng tôi gửi thông báo đến bạn sản phẩm ${sapham} này bạn đã thắng .
        Giá hiện tại: ${sapham.price}
        <br/> <br/>
        `;
        const html1 = `Hi ${fullname},
        <br/>
        Chúng tôi gửi thông báo đến bạn sản phẩm ${sapham} này đã được ${userBid.fullname} đã mua.
        Giá hiện tại: ${sapham.price}
        <br/> <br/>
        `;
        await sendMail(
          appConfig.Mail.Gmail_USER,
          userSel.email,
          "[Auction]",
          html
        );
        await sendMail(
          appConfig.Mail.Gmail_USER,
          userBid.email,
          "[Auction]",
          html1
        );
      }
      return this.responseSuccess(
        res,
        {
          success: true,
          userSel: userSel.email,
          userBid: userBid.email,
          userBidOld: userBidOld.email,
        },
        "Send Mail successfully"
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

export default new SendMailController();
