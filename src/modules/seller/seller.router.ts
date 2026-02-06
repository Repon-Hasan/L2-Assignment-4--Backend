import { Router } from "express";
import { deleteMedicine, getAdminDashboardStats, sellerController, updateMedicine, updateOrderItemStatusController } from "./seller.controller";
import { requireAuth } from "../../middlewares/auth.middleware";


const sellerRouter=Router()

sellerRouter.post("/add",sellerController.addMedicineController)
sellerRouter.get("/medicines",sellerController.getAllMedicine)
sellerRouter.get("/:id",requireAuth,sellerController.getMyMedicineController)

sellerRouter.get("/single/:id",requireAuth,sellerController.getSingleMedicineController)

sellerRouter.patch("/:id", updateMedicine);
sellerRouter.delete("/:id", deleteMedicine);
sellerRouter.get("/admin/dashboard-stats", requireAuth, getAdminDashboardStats);
sellerRouter.patch(
  "/order-item/:id",
  requireAuth,
  updateOrderItemStatusController
);

export default sellerRouter