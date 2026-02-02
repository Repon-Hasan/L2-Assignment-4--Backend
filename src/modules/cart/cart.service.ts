import { prisma } from "../../lib/prisma";

export const addToCart = async (userId: string, medicineId: string) => {
  let cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        items: { create: { medicineId, quantity: 1 } },
      },
      include: { items: true },
    });
  } else {
    const existingItem = cart.items.find(i => i.medicineId === medicineId);
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, medicineId, quantity: 1 },
      });
    }
  }

  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};

export const getCart = async (userId: string) => {
  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};


export const removeCartItem = async (userId: string, medicineId: string) => {
  const cart = await prisma.cart.findFirst({ where: { userId }, include: { items: true } });
  if (!cart) return null;

  const item = cart.items.find(i => i.medicineId === medicineId);
  if (!item) return cart;

  await prisma.cartItem.delete({ where: { id: item.id } });
  return prisma.cart.findFirst({ where: { userId }, include: { items: { include: { medicine: true } } } });
};



export const updateQuantityService = async (
  userId: string,
  medicineId: string,
  quantity: number
) => {
  // Find cart
  const cart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  // Check item exists
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      medicineId,
    },
  });

  if (!cartItem) {
    throw new Error("Item not found in cart");
  }

  // Update quantity
  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity },
  });

  // Return updated cart
  return prisma.cart.findFirst({
    where: { id: cart.id },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });
};
