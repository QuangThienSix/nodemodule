import { Router } from "express";
import ProductController from "../controllers/ProductController";
/**
 * Follow this format for normal routing
 */

const product = () => {
  let api = Router();
  api.post("/", ProductController.creatProduct);
  api.put("/", ProductController.updateProduct);
  api.delete("/", ProductController.deleteProduct);
  api.get("/top5-ratting", ProductController.getTop5ProductRatting);
  api.get("/top5-price", ProductController.getTop5ProductPrice);
  api.get("/top5-active", ProductController.getTop5ProductAcitve);
  api.get("/top5-recomment", ProductController.getTop5ProductRecoment);
  api.get("/:id", ProductController.getProductById);
  api.get("/", ProductController.getProduct);
  api.get("/search", ProductController.Query);

  return api;
};

export default product();
