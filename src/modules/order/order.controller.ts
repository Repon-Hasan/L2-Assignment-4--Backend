import { Request, Response } from "express";
import * as orderService from "./order.service";

export const placeOrder = async (req: any, res: Response) => {
  try {
    const { shippingAddress } = req.body;
    const order = await orderService.placeOrder(req.user.id, shippingAddress);
    res.json({ success: true, order });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getOrders = async (req: any, res: Response) => {
  const orders = await orderService.getOrders(req.user.id);
  res.json({ success: true, orders });
};

export const getOrderStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};
