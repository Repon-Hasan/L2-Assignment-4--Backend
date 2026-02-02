import { User } from "better-auth";
import { Order, OrderItem } from "../../generated/prisma/client";


declare global {
  namespace Express {
    interface Request {
      user?: User;              // injected by auth middleware
      order?: Order;            // optional: loaded order
      orderItem?: OrderItem;    // optional: loaded order item
    }
  }
}

export {};
