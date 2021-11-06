import { Router } from "express";
import SendMailController from "../controllers/sendMailController";

/**
 * Follow this format for normal routing
 */

const sendMail = () => {
  let api = Router();
  api.post("/auctionSuccess", SendMailController.sendPriceSuccess);
  api.post("/win", SendMailController.winAuctionSuccess);
  return api;
};

export default sendMail();
