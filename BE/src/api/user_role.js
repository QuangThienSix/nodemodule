import { Router } from "express";
import UserRoleController from "../controllers/userRoleController";
/**
 * Follow this format for normal routing
 */

const userRole = () => {
  let api = Router();
  api.get("/", UserRoleController.getAll);
  return api;
};

export default userRole();
