import app from "./app";
import { prisma } from "./lib/prisma";
const PORT=process.env.PORT || 4000

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import serverless from "serverless-http"; // ✅

// import { toNodeHandler } from "better-auth/node";
// import sellerRouter from "./modules/seller/seller.router";
// import { auth } from "./lib/auth";
// import { userRouter } from "./modules/user/user.router";
// import cartRoutes from "./modules/cart/cart.routes";
// import orderRoutes from "./modules/order/order.routes";
// import reviewRoutes from "./modules/reviewe/review.route";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "https://l2-assignment-4-frontend-b961.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// app.all("/api/auth/*splat", toNodeHandler(auth));
// app.use("/shop", sellerRouter);
// app.use("/api", userRouter);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/reviews", reviewRoutes);

// async function server() {
//     app.listen(4000,()=>{
//     console.log(`Server Running at:4000`)
// })
// }
// server()
// // Wrap Express app in serverless handler
// export const handler = serverless(app);
