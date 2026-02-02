import express from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import sellerRouter from "./modules/seller/seller.router"
import { auth } from "./lib/auth";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/user/user.router";
import cartRoutes from "./modules/cart/cart.routes"
import orderRoutes from "./modules/order/order.routes"
import reviewRoutes from "./modules/reviewe/review.route"

const app = express()
app.use(express.json())
app.use(cookieParser());
// app.use( cors({
//     origin: "http://localhost:3000", 
//     methods: ["GET", "POST", "PUT", "DELETE"],  
//     credentials: true,
//   }))
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }))
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/shop",sellerRouter)
app.use("/api", userRouter);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

export default app