import { Request, response, Response } from "express";
import { sellerService } from "./seller.services"
import { string } from "better-auth";


const addMedicineController=async(req: Request, res: Response)=>{
    try {
        
        const payload = req.body
        const result = await sellerService.createMedicine(payload)
        console.log("Controller received payload:", payload)
        res.status(201).json({ message: "Medicine added", data: result })
        
    } catch (error) {
        console.log(error)
    }
}

const getAllMedicine=async(req: Request, res: Response)=>{
    try {
        const result= await sellerService.getMedicine()
        res.status(200).json({message:"Data get successfully",data:result})
    } catch (error) {
        console.log(error)
    }
}

const getSingleMedicine=async(req:Request,res:Response)=>{
    const id=req.params.id as string
    try {
           const result = await sellerService.getSingleMedicine(id)
              res.status(200).json({
      message: "Single medicine fetched",
      data: result,
    })
    } catch (error) {
          console.log(error)
    }
}
export const sellerController={
    addMedicineController,getAllMedicine,getSingleMedicine
}