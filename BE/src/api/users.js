import { Router } from "express";
import UsersController from "../controllers/usersController";
/**
 * Follow this format for normal routing
 */

const users = () => {
  let api = Router();
  api.get("/", UsersController.listUser);
  api.get("/:user_id", UsersController.listUser);
  api.get("/:_page&_limit", UsersController.listUser);
  api.delete("/:user_id", UsersController.deleteUser);
  api.patch("/:user_id", UsersController.updateUser);
  api.post("/", UsersController.addUser);
  return api;
};

export default users();
