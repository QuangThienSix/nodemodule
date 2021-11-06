import { Router } from "express";
import transformController from "../controllers/transformController";
import { authMdw } from "../middleware/auth.mdw";
import { Validate } from "../middleware/validate.mdw";
import schema_auth from "../schemas/auth.json";
import schema_signup from "../schemas/signUp.json";
import schema_rfToken from "../schemas/rfToken.json";
import schema_verify from "../schemas/verify.json";
/**
 * Follow this format for normal routing
 */

const transform = () => {
  let api = Router();
  api.post("/", transformController.creatTransform);
  api.put("/",  transformController.actionTransform);
  api.get("/", transformController.getTransform);
  return api;
};

export default transform();
