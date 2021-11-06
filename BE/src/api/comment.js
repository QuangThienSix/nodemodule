import { Router } from "express";
import commentController from "../controllers/CommentController";
import { authMdw } from "../middleware/auth.mdw";
import { Validate } from "../middleware/validate.mdw";
import schema_auth from "../schemas/auth.json";
import schema_signup from "../schemas/signUp.json";
import schema_rfToken from "../schemas/rfToken.json";
import schema_verify from "../schemas/verify.json";
/**
 * Follow this format for normal routing
 */

const comment = () => {
  let api = Router();
  api.post("/", commentController.creatComment);
  api.get("/:product_id", commentController.getCommentProduct);
  return api;
};

export default comment();
