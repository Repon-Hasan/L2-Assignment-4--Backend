// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/modules/seller/seller.router.ts
import { Router } from "express";

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  SELLER: "SELLER"
};
var OrderStatus = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED"
};

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\n// generator client {\n//   provider = "prisma-client"\n//   output   = "../generated/prisma"\n// }\n\n// datasource db {\n//   provider = "postgresql"\n// }\n\n// model Medicine {\n//   id          String    @id @default(uuid())\n//   name        String\n//   genericName String?\n//   brand       String?\n//   category    String?\n//   description String?\n//   price       Float\n//   discount    Float     @default(0)\n//   stock       Int       @default(0)\n//   expiryDate  DateTime?\n//   sellerEmail String?\n//   image       String?\n//   status      String    @default("active")\n\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n// }\n// enum Role {\n//  CUSTOMER\n//   ADMIN\n//   SELLER\n// }\n// model User {\n//   id            String    @id\n//   name          String\n//   email         String\n//   role          Role     @default(CUSTOMER) \n//   emailVerified Boolean   @default(false)\n//   image         String?\n//   createdAt     DateTime  @default(now())\n//   updatedAt     DateTime  @updatedAt\n//   sessions      Session[]\n//   accounts      Account[]\n\n//   @@unique([email])\n//   @@map("user")\n// }\n\n// model Session {\n//   id        String   @id\n//   expiresAt DateTime\n//   token     String\n//   createdAt DateTime @default(now())\n//   updatedAt DateTime @updatedAt\n//   ipAddress String?\n//   userAgent String?\n//   userId    String\n//   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n//   @@unique([token])\n//   @@index([userId])\n//   @@map("session")\n// }\n\n// model Account {\n//   id                    String    @id\n//   accountId             String\n//   providerId            String\n//   userId                String\n//   user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n//   accessToken           String?\n//   refreshToken          String?\n//   idToken               String?\n//   accessTokenExpiresAt  DateTime?\n//   refreshTokenExpiresAt DateTime?\n//   scope                 String?\n//   password              String?\n//   createdAt             DateTime  @default(now())\n//   updatedAt             DateTime  @updatedAt\n\n//   @@index([userId])\n//   @@map("account")\n// }\n\n// model Verification {\n//   id         String   @id\n//   identifier String\n//   value      String\n//   expiresAt  DateTime\n//   createdAt  DateTime @default(now())\n//   updatedAt  DateTime @updatedAt\n\n//   @@index([identifier])\n//   @@map("verification")\n// }\n\n// model Cart {\n//   id       String      @id @default(uuid())\n//   user     User        @relation(fields: [userId], references: [id])\n//   userId   String\n//   items    CartItem[]\n//   updatedAt DateTime    @updatedAt\n// }\n\n// model CartItem {\n//   id         String   @id @default(uuid())\n//   cart       Cart     @relation(fields: [cartId], references: [id])\n//   cartId     String\n//   medicine   Medicine @relation(fields: [medicineId], references: [id])\n//   medicineId String\n//   quantity   Int      @default(1)\n// }\n\n// model Order {\n//   id             String      @id @default(uuid())\n//   user           User        @relation(fields: [userId], references: [id])\n//   userId         String\n//   items          OrderItem[]\n//   shippingAddress String\n//   totalAmount    Float\n//   status         OrderStatus @default(PENDING)\n//   createdAt      DateTime    @default(now())\n//   updatedAt      DateTime    @updatedAt\n// }\n\n// model OrderItem {\n//   id         String   @id @default(uuid())\n//   order      Order    @relation(fields: [orderId], references: [id])\n//   orderId    String\n//   medicine   Medicine @relation(fields: [medicineId], references: [id])\n//   medicineId String\n//   quantity   Int\n//   price      Float\n// }\n\n// model Review {\n//   id         String   @id @default(uuid())\n//   user       User     @relation(fields: [userId], references: [id])\n//   userId     String\n//   medicine   Medicine @relation(fields: [medicineId], references: [id])\n//   medicineId String\n//   rating     Int\n//   comment    String\n//   createdAt  DateTime @default(now())\n// }\n\n// enum Roles {\n//   CUSTOMER\n//   SELLER\n//   ADMIN\n// }\n\n// enum OrderStatus {\n//   PENDING\n//   SHIPPED\n//   DELIVERED\n// }\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  ADMIN\n  SELLER\n}\n\nenum OrderStatus {\n  PENDING\n  SHIPPED\n  DELIVERED\n}\n\nmodel Medicine {\n  id          String    @id @default(uuid())\n  name        String\n  genericName String?\n  brand       String?\n  category    String?\n  description String?\n  price       Float\n  discount    Float     @default(0)\n  stock       Int       @default(0)\n  expiryDate  DateTime?\n  sellerEmail String?\n  image       String?\n  status      String    @default("active")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Back-relations\n  cartItems  CartItem[]\n  orderItems OrderItem[]\n  reviews    Review[]\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String     @unique\n  role          Role       @default(CUSTOMER)\n  status        UserStatus @default(ACTIVE) // \u2705 added\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n\n  sessions Session[]\n  accounts Account[]\n\n  carts   Cart[]\n  orders  Order[]\n  reviews Review[]\n\n  @@map("user")\n}\n\n// model User {\n//   id            String    @id\n//   name          String\n//   email         String    @unique\n//   role          Role      @default(CUSTOMER)\n//   emailVerified Boolean   @default(false)\n//   image         String?\n//   createdAt     DateTime  @default(now())\n//   updatedAt     DateTime  @updatedAt\n\n//   sessions      Session[]\n//   accounts      Account[]\n\n//   // Back-relations for Customer Features\n//   carts         Cart[]\n//   orders        Order[]\n//   reviews       Review[]\n\n//   @@map("user")\n// }\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  user      User       @relation(fields: [userId], references: [id])\n  userId    String\n  items     CartItem[]\n  updatedAt DateTime   @updatedAt\n}\n\nmodel CartItem {\n  id         String   @id @default(uuid())\n  cart       Cart     @relation(fields: [cartId], references: [id])\n  cartId     String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  medicineId String\n  quantity   Int      @default(1)\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  user            User        @relation(fields: [userId], references: [id])\n  userId          String\n  items           OrderItem[]\n  shippingAddress String\n  totalAmount     Float\n  status          OrderStatus @default(PENDING)\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n}\n\nmodel OrderItem {\n  id         String      @id @default(uuid())\n  order      Order       @relation(fields: [orderId], references: [id])\n  orderId    String\n  medicine   Medicine    @relation(fields: [medicineId], references: [id])\n  medicineId String\n  quantity   Int\n  price      Float\n  status     OrderStatus @default(PENDING)\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  user       User     @relation(fields: [userId], references: [id])\n  userId     String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  medicineId String\n  rating     Int\n  comment    String\n  createdAt  DateTime @default(now())\n\n  @@unique([userId, medicineId]) // \u2705 REQUIRED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"genericName","kind":"scalar","type":"String"},{"name":"brand","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"discount","kind":"scalar","type":"Float"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"expiryDate","kind":"scalar","type":"DateTime"},{"name":"sellerEmail","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMedicine"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"CartItemToMedicine"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = "postgresql://postgres:65641853@localhost:5432/assignment4?schema=public";
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/seller/seller.services.ts
var createMedicine = async (payload) => {
  const medicine = await prisma.medicine.create({
    data: {
      ...payload,
      price: Number(payload.price),
      // ensure float
      discount: Number(payload.discount) || 0,
      stock: Number(payload.stock) || 0,
      expiryDate: payload.expiryDate ? new Date(payload.expiryDate) : null,
      status: payload.status || "active"
    }
  });
  console.log("Medicine added to DB:", medicine);
  return medicine;
};
var getMedicine = async () => {
  const getMedicine2 = await prisma.medicine.findMany();
  return getMedicine2;
};
var getMyMedicine = async (sellerEmail) => {
  const medicines = await prisma.medicine.findMany({
    where: { sellerEmail }
  });
  return medicines;
};
var getSingleMedicine = async (id) => {
  const medicines = await prisma.medicine.findUnique({
    where: { id }
  });
  return medicines;
};
var updateMedicineById = async (id, payload) => {
  return prisma.medicine.update({
    where: { id },
    data: {
      name: payload.name,
      genericName: payload.genericName,
      brand: payload.brand,
      category: payload.category,
      description: payload.description,
      price: payload.price,
      discount: payload.discount,
      stock: payload.stock,
      expiryDate: payload.expiryDate,
      sellerEmail: payload.sellerEmail,
      image: payload.image,
      status: payload.status
    }
  });
};
var deleteMedicineById = async (id) => {
  return prisma.medicine.delete({
    where: { id }
  });
};
var updateOrderItemStatusInDB = async (orderItemId, status) => {
  return prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status }
  });
};
var updateOrderItemStatusService = async (orderItemId, status) => {
  const updatedItem = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status },
    include: {
      order: {
        include: {
          items: true
        }
      }
    }
  });
  const orderId = updatedItem.orderId;
  const orderItems = updatedItem.order.items;
  let newOrderStatus = OrderStatus.PENDING;
  if (orderItems.every((i) => i.status === OrderStatus.DELIVERED)) {
    newOrderStatus = OrderStatus.DELIVERED;
  } else if (orderItems.some((i) => i.status === OrderStatus.SHIPPED)) {
    newOrderStatus = OrderStatus.SHIPPED;
  }
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newOrderStatus }
  });
  return {
    updatedItem,
    orderStatus: newOrderStatus
  };
};
var sellerService = {
  createMedicine,
  getMedicine,
  getMyMedicine,
  getSingleMedicine,
  updateOrderItemStatusInDB
};

// src/modules/seller/seller.controller.ts
var addMedicineController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await sellerService.createMedicine(payload);
    return res.status(201).json({ message: "Medicine added", data: result });
  } catch (error) {
    console.error("Error adding medicine:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};
var getAllMedicine = async (req, res) => {
  try {
    const result = await sellerService.getMedicine();
    res.status(200).json({ message: "Data get successfully", data: result });
  } catch (error) {
    console.log(error);
  }
};
var getMyMedicineController = async (req, res) => {
  try {
    const sellerEmail = req.user.email;
    if (!sellerEmail)
      return res.status(401).json({ message: "Not authenticated" });
    const result = await sellerService.getMyMedicine(sellerEmail);
    res.status(200).json({
      message: "Seller medicines fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching seller medicines:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
var getSingleMedicineController = async (req, res) => {
  try {
    const medicineId = req.params.id;
    if (!medicineId)
      return res.status(400).json({ message: "Medicine ID is required" });
    const medicine = await sellerService.getSingleMedicine(medicineId);
    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json({
      message: "Medicine fetched successfully",
      data: medicine
    });
  } catch (error) {
    console.error("Error fetching medicine:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
var updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updatedMedicine = await updateMedicineById(id, payload);
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: updatedMedicine
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update medicine"
    });
  }
};
var deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMedicineById(id);
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete medicine"
    });
  }
};
var getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalCustomers,
      totalSellers,
      totalAdmins,
      bannedUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: Role.CUSTOMER } }),
      prisma.user.count({ where: { role: Role.SELLER } }),
      prisma.user.count({ where: { role: Role.ADMIN } }),
      prisma.user.count({ where: { status: UserStatus.BANNED } })
    ]);
    const [totalMedicines, activeMedicines, outOfStockMedicines, allMedicines] = await Promise.all([
      prisma.medicine.count(),
      prisma.medicine.count({ where: { status: "active" } }),
      prisma.medicine.count({ where: { stock: 0 } }),
      prisma.medicine.findMany()
      // ✅ get all medicine details
    ]);
    const [
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.count({ where: { status: OrderStatus.SHIPPED } }),
      prisma.order.count({ where: { status: OrderStatus.DELIVERED } })
    ]);
    const revenueAgg = await prisma.order.aggregate({
      where: { status: OrderStatus.DELIVERED },
      _sum: { totalAmount: true },
      _avg: { totalAmount: true }
    });
    const soldItemsAgg = await prisma.orderItem.aggregate({
      where: { status: OrderStatus.DELIVERED },
      _sum: { quantity: true }
    });
    return res.status(200).json({
      users: {
        total: totalUsers,
        customers: totalCustomers,
        sellers: totalSellers,
        admins: totalAdmins,
        banned: bannedUsers
      },
      medicines: {
        total: totalMedicines,
        active: activeMedicines,
        outOfStock: outOfStockMedicines,
        data: allMedicines
        // ✅ include all medicine objects
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders
      },
      revenue: {
        totalRevenue: revenueAgg._sum.totalAmount ?? 0,
        averageOrderValue: revenueAgg._avg.totalAmount ?? 0,
        totalItemsSold: soldItemsAgg._sum.quantity ?? 0
      }
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    return res.status(500).json({ message: "Failed to load admin dashboard stats" });
  }
};
var updateOrderItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await sellerService.updateOrderItemStatusInDB(
      id,
      status
    );
    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status"
    });
  }
};
var updateOrderItemStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }
    const result = await updateOrderItemStatusService(
      id,
      status
    );
    return res.status(200).json({
      success: true,
      message: "Order item status updated",
      data: result
    });
  } catch (error) {
    console.error("Update order item error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order item status"
    });
  }
};
var sellerController = {
  addMedicineController,
  getAllMedicine,
  getMyMedicineController,
  getSingleMedicineController,
  updateOrderItemStatus
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/password.ts
import { hash, verify } from "@node-rs/argon2";
var opts = {
  memoryCost: 65536,
  // 64 MiB
  timeCost: 3,
  // 3 iterations
  parallelism: 4,
  // 4 lanes
  outputLen: 32,
  // 32 bytes
  algorithm: 2
  // Argon2id
};
async function hashPassword(password) {
  const result = await hash(password, opts);
  return result;
}
async function verifyPassword(data) {
  const { password, hash: hash2 } = data;
  const result = await verify(hash2, password, opts);
  return result;
}

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: ["https://l2-assignment-4-frontend-b961.vercel.app"],
  // your frontend
  emailAndPassword: { enabled: true },
  password: {
    hash: hashPassword,
    verify: verifyPassword
  },
  user: {
    additionalFields: {
      role: true,
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE"
      }
    }
  },
  cookies: {
    secure: false,
    // must be false for localhost HTTP
    sameSite: "lax"
    // allow browser to send cookies
  }
});

// src/middlewares/auth.middleware.ts
var requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
      cookies: req.cookies
      // 🔥 REQUIRED for cookie auth
    });
    console.log("Header is ");
    if (!session || !session.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    req.user = session.user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// src/modules/seller/seller.router.ts
var sellerRouter = Router();
sellerRouter.post("/add", sellerController.addMedicineController);
sellerRouter.get("/medicines", sellerController.getAllMedicine);
sellerRouter.get("/:id", requireAuth, sellerController.getMyMedicineController);
sellerRouter.get("/single/:id", requireAuth, sellerController.getSingleMedicineController);
sellerRouter.patch("/:id", updateMedicine);
sellerRouter.delete("/:id", deleteMedicine);
sellerRouter.get("/admin/dashboard-stats", requireAuth, getAdminDashboardStats);
sellerRouter.patch(
  "/order-item/:id",
  requireAuth,
  updateOrderItemStatusController
);
var seller_router_default = sellerRouter;

// src/app.ts
import cookieParser from "cookie-parser";

// src/modules/user/user.router.ts
import { Router as Router2 } from "express";

// src/modules/user/user.service.ts
async function getCurrentUser(headers) {
  const session = await auth.api.getSession({ headers });
  if (!session) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true
    }
  });
  return user;
}
async function getAllUsers() {
  return prisma.user.findMany({
    where: {
      role: {
        in: ["CUSTOMER", "SELLER"]
      }
    }
  });
}
var userService = {
  updateCurrentUser: async (id, payload) => {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return updatedUser;
  }
};
var updateUserStatus = async (userId, status) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  return prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var userServices = {
  updateUserStatus
};

// src/modules/user/user.controller.ts
async function currentUserController(req, res) {
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
var userController = {
  updateMe: async (req, res) => {
    try {
      const userId = req.user.id;
      const payload = req.body;
      delete payload.role;
      delete payload.email;
      const result = await userService.updateCurrentUser(
        userId,
        payload
      );
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update profile"
      });
    }
  }
};
var getAllUser = async (req, res) => {
  try {
    const user = await getAllUsers();
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({ user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile"
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const user = await userServices.updateUserStatus(id, status);
    res.status(200).json({
      message: "User status updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// src/modules/user/user.router.ts
var router = Router2();
router.get("/me", currentUserController);
router.post("/logout", async (req, res) => {
  try {
    await auth.api.signOut({
      headers: req.headers
    });
    return res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
});
router.get("/users", getAllUser);
router.patch("/users/me", requireAuth, userController.updateMe);
router.patch(
  "/:id/status",
  requireAuth,
  updateUserStatus2
);
var userRouter = router;

// src/modules/cart/cart.routes.ts
import { Router as Router3 } from "express";

// src/modules/cart/cart.service.ts
var addToCart = async (userId, medicineId) => {
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        items: { create: { medicineId, quantity: 1 } }
      },
      include: { items: true }
    });
  } else {
    const existingItem = cart.items.find((i) => i.medicineId === medicineId);
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 }
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, medicineId, quantity: 1 }
      });
    }
  }
  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};
var getCart = async (userId) => {
  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};
var removeCartItem = async (userId, medicineId) => {
  const cart = await prisma.cart.findFirst({ where: { userId }, include: { items: true } });
  if (!cart) return null;
  const item = cart.items.find((i) => i.medicineId === medicineId);
  if (!item) return cart;
  await prisma.cartItem.delete({ where: { id: item.id } });
  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};
var updateQuantityService = async (userId, medicineId, quantity) => {
  const cart = await prisma.cart.findFirst({
    where: { userId }
  });
  if (!cart) {
    throw new Error("Cart not found");
  }
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      medicineId
    }
  });
  if (!cartItem) {
    throw new Error("Item not found in cart");
  }
  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity }
  });
  return prisma.cart.findFirst({
    where: { id: cart.id },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
};

// src/modules/cart/cart.controller.ts
var addToCart2 = async (req, res) => {
  try {
    const { medicineId } = req.body;
    const cart = await addToCart(req.user.id, medicineId);
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
var getCart2 = async (req, res) => {
  const cart = await getCart(req.user.id);
  res.json({ success: true, cart });
};
var removeCartItem2 = async (req, res) => {
  const { medicineId } = req.params;
  const cart = await removeCartItem(req.user.id, medicineId);
  res.json({ success: true, cart });
};
var updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { medicineId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }
    const updatedCart = await updateQuantityService(
      userId,
      medicineId,
      quantity
    );
    return res.status(200).json({
      success: true,
      cart: updatedCart
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update cart quantity"
    });
  }
};

// src/modules/cart/cart.routes.ts
var router2 = Router3();
router2.post("/add", requireAuth, addToCart2);
router2.get("/", requireAuth, getCart2);
router2.delete("/remove/:medicineId", requireAuth, removeCartItem2);
router2.patch(
  "/update/:medicineId",
  requireAuth,
  updateCartQuantity
);
var cart_routes_default = router2;

// src/modules/order/order.routes.ts
import { Router as Router4 } from "express";

// src/modules/order/order.service.ts
var placeOrder = async (userId, shippingAddress) => {
  const cart = await prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");
  const totalAmount = cart.items.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);
  const order = await prisma.order.create({
    data: {
      userId,
      shippingAddress,
      totalAmount,
      items: {
        create: cart.items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.medicine.price
        }))
      }
    },
    include: { items: true }
  });
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return order;
};
var getOrders = async (userId) => {
  return prisma.order.findMany();
};
var getOrdersByUserId = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      }
    }
  });
};
var getSellerOrders = async (sellerEmail) => {
  const medicines = await prisma.medicine.findMany({
    where: { sellerEmail },
    select: { id: true }
  });
  const medicineIds = medicines.map((m) => m.id);
  if (medicineIds.length === 0) return [];
  const orderItems = await prisma.orderItem.findMany({
    where: {
      medicineId: { in: medicineIds }
    },
    include: {
      medicine: true,
      order: { include: { user: true } }
    }
  });
  return orderItems;
};

// src/modules/order/order.controller.ts
var placeOrder2 = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const order = await placeOrder(req.user.id, shippingAddress);
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
var getOrders2 = async (req, res) => {
  const orders = await getOrders(req.user.id);
  res.json({ success: true, orders });
};
var getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await getOrdersByUserId(userId);
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user"
      });
    }
    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders"
    });
  }
};
var getSellerOrdersController = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getSellerOrders(email);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders"
    });
  }
};

// src/modules/order/order.routes.ts
var router3 = Router4();
router3.post("/create", requireAuth, placeOrder2);
router3.get("/", requireAuth, getOrders2);
router3.get("/user/:userId", getOrdersByUser);
router3.get(
  "/seller/:email",
  requireAuth,
  getSellerOrdersController
);
var order_routes_default = router3;

// src/modules/reviewe/review.route.ts
import { Router as Router5 } from "express";

// src/modules/reviewe/review.service.ts
var reviewService = {
  async canReview(userId, medicineId) {
    const ordered = await prisma.orderItem.findFirst({
      where: {
        medicineId,
        order: {
          userId,
          status: "DELIVERED"
        }
      }
    });
    if (!ordered) return false;
    const reviewed = await prisma.review.findUnique({
      where: {
        userId_medicineId: { userId, medicineId }
      }
    });
    return !reviewed;
  },
  async createReview(userId, payload) {
    const { medicineId, rating, comment } = payload;
    const canReview = await this.canReview(userId, medicineId);
    if (!canReview) {
      throw new Error("You cannot review this medicine");
    }
    return prisma.review.create({
      data: {
        userId,
        medicineId,
        rating,
        comment
      }
    });
  },
  async getReviewsByMedicine(medicineId) {
    return prisma.review.findMany();
  }
};

// src/modules/reviewe/review.controller.ts
var reviewController = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const review = await reviewService.createReview(userId, req.body);
      res.status(201).json({
        message: "Review submitted",
        data: review
      });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },
  async canReview(req, res) {
    const userId = req.user.id;
    const { medicineId } = req.params;
    const canReview = await reviewService.canReview(userId, medicineId);
    res.json({ canReview });
  },
  async getByMedicine(req, res) {
    const { medicineId } = req.params;
    const reviews = await reviewService.getReviewsByMedicine(medicineId);
    res.json(reviews);
  }
};

// src/modules/reviewe/review.route.ts
var router4 = Router5();
router4.post("/", requireAuth, reviewController.create);
router4.get("/can-review", requireAuth, reviewController.canReview);
router4.get("/my-review", reviewController.getByMedicine);
var review_route_default = router4;

// src/app.ts
var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://l2-assignment-4-frontend-b961.vercel.app",
  // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  // Specify allowed HTTP methods
  credentials: true
  // Allow credentials (cookies, authorization headers, etc.)
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/shop", seller_router_default);
app.use("/api", userRouter);
app.use("/api/cart", cart_routes_default);
app.use("/api/orders", order_routes_default);
app.use("/api/reviews", review_route_default);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
