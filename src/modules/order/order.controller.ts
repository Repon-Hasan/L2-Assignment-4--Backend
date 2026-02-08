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

// export const getOrderStatus = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;

//     const order = await orderService.getOrderById(id);
            
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     res.json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch order details",
//     });
//   }
// };


export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await orderService.getOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};




export const getSellerOrdersController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const result = await orderService.getSellerOrders(email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders",
    });
  }
};


