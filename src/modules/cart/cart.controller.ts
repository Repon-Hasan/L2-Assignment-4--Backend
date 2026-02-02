import { Request, Response } from "express";
import * as cartService from "./cart.service";

export const addToCart = async (req: any, res: Response) => {
  try {
    const { medicineId } = req.body;
    const cart = await cartService.addToCart(req.user.id, medicineId);
    res.json({ success: true, cart });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCart = async (req: any, res: Response) => {
  const cart = await cartService.getCart(req.user.id);
  res.json({ success: true, cart });
};

export const removeCartItem = async (req: any, res: Response) => {
  const { medicineId } = req.params;
  const cart = await cartService.removeCartItem(req.user.id, medicineId);
  res.json({ success: true, cart });
};


export const updateCartQuantity = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { medicineId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const updatedCart = await cartService.updateQuantityService(
      userId,
      medicineId,
      quantity
    );

    return res.status(200).json({
      success: true,
      cart: updatedCart,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update cart quantity",
    });
  }
};
