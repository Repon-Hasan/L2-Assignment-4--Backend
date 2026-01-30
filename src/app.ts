import express from "express"
import cors from "cors"
import sellerRouter from "./modules/seller/seller.router"
const app = express()

app.use(express.json())
// app.use( cors({
//     origin: "http://localhost:3000", 
//     methods: ["GET", "POST", "PUT", "DELETE"],  
//     credentials: true,
//   }))
app.use(cors())
app.use("/shop",sellerRouter)
export default app