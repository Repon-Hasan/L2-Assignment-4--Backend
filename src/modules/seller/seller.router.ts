import { Router } from "express";
import { sellerController } from "./seller.controller";


const sellerRouter=Router()

sellerRouter.post("/add",sellerController.addMedicineController)
sellerRouter.get("/medicines",sellerController.getAllMedicine)
sellerRouter.get("/:id",sellerController.getSingleMedicine)

export default sellerRouter