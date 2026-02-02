import { Router } from "express";
import { reviewController } from "./review.controller";
import { requireAuth } from "../../middlewares/auth.middleware";


const router = Router();

router.post("/", requireAuth, reviewController.create);
router.get("/can-review", requireAuth, reviewController.canReview);
router.get("/my-review", reviewController.getByMedicine);

export default router;
