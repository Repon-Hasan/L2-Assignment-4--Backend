import { Request, response, Response } from "express";
import { deleteMedicineById, sellerOrder, sellerService, updateMedicineById } from "./seller.services"
import { string } from "better-auth";
import { prisma } from "../../lib/prisma";
import { OrderStatus, Role, UserStatus } from "../../../generated/prisma/enums";


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


const getSingleMedicineController = async (req: Request, res: Response) => {
  try {
    const medicineId = req.params.id; // ✅ get from URL

    if (!medicineId)
      return res.status(400).json({ message: "Medicine ID is required" });

    const medicine = await sellerService.getSingleMedicine(medicineId);

    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({
      message: "Medicine fetched successfully",
      data: medicine,
    });
  } catch (error: any) {
    console.error("Error fetching medicine:", error);
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

export const getAdminDashboardStats = async (req: Request, res: Response) => {
  try {
    /* ================= USERS ================= */
    const [
      totalUsers,
      totalCustomers,
      totalSellers,
      totalAdmins,
      bannedUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: Role.CUSTOMER } }),
      prisma.user.count({ where: { role: Role.SELLER } }),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.user.count({ where: { status: UserStatus.BANNED } }),
    ]);

    /* ================= MEDICINES ================= */
    const [totalMedicines, activeMedicines, outOfStockMedicines, allMedicines] = await Promise.all([
      prisma.medicine.count(),
      prisma.medicine.count({ where: { status: "active" } }),
      prisma.medicine.count({ where: { stock: 0 } }),
      prisma.medicine.findMany(), // ✅ get all medicine details
    ]);

    /* ================= ORDERS ================= */
    const [
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { status: OrderStatus.SHIPPED } }),
      prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
    ]);

    /* ================= REVENUE ================= */
    const revenueAgg = await prisma.order.aggregate({
      where: { status: OrderStatus.DELIVERED },
      _sum: { totalAmount: true },
      _avg: { totalAmount: true },
    });

    /* ================= SOLD ITEMS ================= */
    const soldItemsAgg = await prisma.orderItem.aggregate({
      where: { status: OrderStatus.DELIVERED },
      _sum: { quantity: true },
    });

    /* ================= RESPONSE ================= */
    return res.status(200).json({
      users: {
        total: totalUsers,
        customers: totalCustomers,
        sellers: totalSellers,
        admins: totalAdmins,
        banned: bannedUsers,
      },
      medicines: {
        total: totalMedicines,
        active: activeMedicines,
        outOfStock: outOfStockMedicines,
        data: allMedicines, // ✅ include all medicine objects
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
      },
      revenue: {
        totalRevenue: revenueAgg._sum.totalAmount ?? 0,
        averageOrderValue: revenueAgg._avg.totalAmount ?? 0,
        totalItemsSold: soldItemsAgg._sum.quantity ?? 0,
      },
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    return res.status(500).json({ message: "Failed to load admin dashboard stats" });
  }
};


export const sellerController={
    addMedicineController,getAllMedicine,getMyMedicineController,getSingleMedicineController
}