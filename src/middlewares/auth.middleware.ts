import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { toNodeHandler } from "better-auth/node";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
      cookies: req.cookies,
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // 🔥 Attach user to request
    req.user = session.user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
