import { Request, response, Response } from "express";
import { deleteMedicineById, sellerOrder, sellerService, updateMedicineById } from "./seller.services"
import { string } from "better-auth";


const addMedicineController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await sellerService.createMedicine(payload);
    //console.log("Controller received payload:", payload);
    return res.status(201).json({ message: "Medicine added", data: result });
  } catch (error: any) {
    console.error("Error adding medicine:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};


const getAllMedicine=async(req: Request, res: Response)=>{
    try {
        const result= await sellerService.getMedicine()
        res.status(200).json({message:"Data get successfully",data:result})
    } catch (error) {
        console.log(error)
    }
}

const getMyMedicineController = async (req: Request, res: Response) => {
  try {
    // Assuming you have requireAuth middleware that sets req.user
    const sellerEmail = req.user.email; 

    if (!sellerEmail)
      return res.status(401).json({ message: "Not authenticated" });

    const result = await sellerService.getMyMedicine(sellerEmail);

    res.status(200).json({
      message: "Seller medicines fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Error fetching seller medicines:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};


// 🔹 UPDATE MEDICINE
export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedMedicine =
      await updateMedicineById(id, payload);

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: updatedMedicine,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update medicine",
    });
  }
};

// 🔹 DELETE MEDICINE
export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteMedicineById(id);

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete medicine",
    });
  }
};

export const sellerController={
    addMedicineController,getAllMedicine,getMyMedicineController
}