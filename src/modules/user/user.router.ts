// backend/src/routes/user.router.ts
import { Router } from "express";
import { currentUserController, getAllUser, userController } from "./user.controller";
import { auth } from "../../lib/auth";
import { requireAuth } from "../../middlewares/auth.middleware";


const router = Router();

router.get("/me", currentUserController);

router.post("/logout", async (req, res) => {
  try {
    await auth.api.signOut({
      headers: req.headers as any,
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

router.get("/users",getAllUser)

router.patch("/users/me", requireAuth, userController.updateMe);

export const userRouter = router;
