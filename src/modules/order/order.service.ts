import { prisma } from "../../lib/prisma";

export const placeOrder = async (userId: string, shippingAddress: string) => {
  const cart = await prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  const totalAmount = cart.items.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      shippingAddress,
      totalAmount,
      items: {
        create: cart.items.map(item => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: item.medicine.price,
        })),
      },
    },
    include: { items: true },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return order;
};

export const getOrders = async (userId: string) => {
  return prisma.order.findMany();
};

export const getOrdersByUserId = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};



export const getSellerOrders = async (sellerEmail: string) => {
  const medicines = await prisma.medicine.findMany({
    where: { sellerEmail },
    select: { id: true },
  });

  const medicineIds = medicines.map(m => m.id);
        
  if (medicineIds.length === 0) return [];

  const orderItems = await prisma.orderItem.findMany({
    where: {
      medicineId: { in: medicineIds },
    },
    include: {
      medicine: true,
      order: { include: { user: true } },
    },
  });
  

  return orderItems;
};

