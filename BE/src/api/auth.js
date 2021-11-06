import { Router } from "express";
import authController from "../controllers/authController";
import { authMdw } from "../middleware/auth.mdw";
import { Validate } from "../middleware/validate.mdw";
import schema_auth from "../schemas/auth.json";
import schema_signup from "../schemas/signUp.json";
import schema_rfToken from "../schemas/rfToken.json";
import schema_verify from "../schemas/verify.json";
/**
 * Follow this format for normal routing
 */

const auth = () => {
  let api = Router();
  api.post("/parsetoken", authController.parseToken);
  api.post("/signup", Validate(schema_signup), authController.signUp);
  api.post(
    "/refresh",
    Validate(schema_rfToken),
    authController.refreshAccessToken
  );
  api.post("/signin", Validate(schema_auth), authController.signIn);
  api.post("/verify", Validate(schema_verify), authController.verify);
  return api;
};

export default auth();
