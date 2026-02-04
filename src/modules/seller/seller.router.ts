import { Router } from "express";
import { deleteMedicine, sellerController, updateMedicine } from "./seller.controller";
import { requireAuth } from "../../middlewares/auth.middleware";


const sellerRouter=Router()

sellerRouter.post("/add",sellerController.addMedicineController)
sellerRouter.get("/medicines",sellerController.getAllMedicine)
sellerRouter.get("/:id",requireAuth,sellerController.getMyMedicineController)
sellerRouter.patch("/:id", updateMedicine);
sellerRouter.delete("/:id", deleteMedicine);

export default sellerRouter