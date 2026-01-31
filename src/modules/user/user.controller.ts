// backend/src/controllers/user.controller.ts
import { Request, Response } from "express";
import { getCurrentUser } from "./user.service";
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
