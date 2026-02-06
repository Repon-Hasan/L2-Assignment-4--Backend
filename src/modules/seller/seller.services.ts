import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

interface CreateMedicinePayload {
  name: string;
  genericName?: string;
  brand?: string;
  category?: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  expiryDate?: Date;
  sellerEmail?: string;
  image?: string;
  status?: string;
}

const createMedicine = async (payload: CreateMedicinePayload) => {
  const medicine = await prisma.medicine.create({
    data: {
      ...payload,
      price: Number(payload.price), // ensure float
      discount: Number(payload.discount) || 0,
      stock: Number(payload.stock) || 0,
      expiryDate: payload.expiryDate ? new Date(payload.expiryDate) : null,
      status: payload.status || "active",
    },
  });
  console.log("Medicine added to DB:", medicine);
  return medicine;
};


const getMedicine=async()=>{
    const getMedicine=await prisma.medicine.findMany()
    return getMedicine
}


const getMyMedicine = async (sellerEmail: string) => {
  const medicines = await prisma.medicine.findMany({
    where: { sellerEmail },
  });
  return medicines;
};

const getSingleMedicine = async (id: string) => {
  const medicines = await prisma.medicine.findUnique({
    where: { id },
  });
  return medicines;
};


export const updateMedicineById = async (
  id: string,
  payload: any
) => {
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
      status: payload.status,
    },
  });
};

export const deleteMedicineById = async (id: string) => {
  return prisma.medicine.delete({
    where: { id },
  });
};


const updateOrderItemStatusInDB = async (
  orderItemId: string,
  status: "PENDING" | "SHIPPED" | "DELIVERED"
) => {
  return prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status },
  });
};




export const updateOrderItemStatusService = async (
  orderItemId: string,
  status: OrderStatus
) => {
  // 1️⃣ Update OrderItem
  const updatedItem = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status },
    include: {
      order: {
        include: {
          items: true,
        },
      },
    },
  });

  const orderId = updatedItem.orderId;

  // 2️⃣ Get all order items for this order
  const orderItems = updatedItem.order.items;

  // 3️⃣ Determine new Order status
  let newOrderStatus: OrderStatus = OrderStatus.PENDING;

  if (orderItems.every(i => i.status === OrderStatus.DELIVERED)) {
    newOrderStatus = OrderStatus.DELIVERED;
  } else if (orderItems.some(i => i.status === OrderStatus.SHIPPED)) {
    newOrderStatus = OrderStatus.SHIPPED;
  }

  // 4️⃣ Update Order status
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newOrderStatus },
  });

  return {
    updatedItem,
    orderStatus: newOrderStatus,
  };
};




export const sellerService={
    createMedicine,getMedicine,getMyMedicine,getSingleMedicine,updateOrderItemStatusInDB
}