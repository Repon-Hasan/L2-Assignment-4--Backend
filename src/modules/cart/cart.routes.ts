import { Router } from "express";
import * as cartController from "./cart.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/add", requireAuth, cartController.addToCart);
router.get("/", requireAuth, cartController.getCart);
router.delete("/remove/:medicineId", requireAuth, cartController.removeCartItem);
router.patch(
  "/update/:medicineId",
  requireAuth,
  cartController.updateCartQuantity
);
export default router;
