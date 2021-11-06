import { Router } from "express";
import brandController from "../controllers/brandController";
import { authMdw } from "../middleware/auth.mdw";
import { Validate } from "../middleware/validate.mdw";
import schema_auth from "../schemas/auth.json";
import schema_signup from "../schemas/signUp.json";
import schema_rfToken from "../schemas/rfToken.json";
import schema_verify from "../schemas/verify.json";
/**
 * Follow this format for normal routing
 */

const brand = () => {
  let api = Router();
  api.post("/", brandController.creatBrand);
  api.put("/",  brandController.updateBrand);
  api.get("/:id", brandController.getBrand);
  return api;
};

export default brand();
