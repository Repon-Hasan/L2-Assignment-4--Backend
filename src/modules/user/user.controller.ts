// backend/src/controllers/user.controller.ts
import { Request, Response } from "express";
import { getCurrentUser, userService } from "./user.service";
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
