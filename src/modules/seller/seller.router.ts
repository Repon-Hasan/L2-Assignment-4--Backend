import { Router } from "express";
import { sellerController, sellerControllerOrder } from "./seller.controller";
import { requireAuth } from "../../middlewares/auth.middleware";


const sellerRouter=Router()

sellerRouter.post("/add",sellerController.addMedicineController)
sellerRouter.get("/medicines",sellerController.getAllMedicine)
sellerRouter.get("/:id",requireAuth,sellerController.getMyMedicineController)


export default sellerRouter