import { Router } from "express";
import WatchListController from "../controllers/watchListController";
import { authMdw } from "../middleware/auth.mdw";
import { Validate } from "../middleware/validate.mdw";
import schema_auth from "../schemas/auth.json";
import schema_signup from "../schemas/signUp.json";
import schema_rfToken from "../schemas/rfToken.json";
import schema_verify from "../schemas/verify.json";
/**
 * Follow this format for normal routing
 */

const watch_list = () => {
  let api = Router();
  api.post("/", WatchListController.creatWatchList);
  api.get("/", WatchListController.getWatchListProduct);
  return api;
};

export default watch_list();
