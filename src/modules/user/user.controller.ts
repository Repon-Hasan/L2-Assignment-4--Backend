// backend/src/controllers/user.controller.ts
import { Request, Response } from "express";
import { getAllUsers, getCurrentUser, userService, userServices } from "./user.service";
;

export async function currentUserController(req: Request, res: Response) {
  try {
    const user = await getCurrentUser(req.headers);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Error in currentUserController:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const userController = {
  updateMe: async (req: Request, res: Response) => {
    try {
      // user id should come from auth middleware
      const userId = req.user.id;
      const payload = req.body;

      // security: block role/email update
      delete payload.role;
      delete payload.email;

      const result = await userService.updateCurrentUser(
        userId,
        payload
      );

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update profile",
      });
    }
  },
};

export const getAllUser=async(req:Request,res:Response)=>{
  try {
        const user = await getAllUsers();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ user });
  } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message || "Failed to update profile",
      });
  }
}

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await userServices.updateUserStatus(id, status);

    res.status(200).json({
      message: "User status updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
