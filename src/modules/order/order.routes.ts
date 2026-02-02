import { Router } from "express";
import * as orderController from "./order.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create", requireAuth, orderController.placeOrder);
router.get("/", requireAuth, orderController.getOrders);
router.get("/:id", requireAuth, orderController.getOrderStatus);
export default router;
