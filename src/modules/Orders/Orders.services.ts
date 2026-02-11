import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (order: any, userId: string) => {
  const result = await prisma.orders.create({
    data: {
      mealId: order.mealId,
      providerId: order.providerId,
      quantity: order.quantity,
      userId,
      totalPrice: order.price,
    },
  });

  await prisma.cart.delete({
    where: {
      id: order.cartId,
    },
  });
  return result;
};

const getOrders = async (userId: string, page: number) => {
  const totalOrders = await prisma.orders.count({
    where: {
      userId,
    },
  });
  const totalPages = Math.ceil(totalOrders / 15);
  const result = await prisma.orders.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
    skip: (page - 1) * 15,
    where: {
      userId,
    },
    select: {
      id: true,
      mealId: true,
      providerId: true,
      quantity: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      meal: {
        select: {
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });
  return {
    result,
    totalPages,
  };
};
const getProviderOrders = async (providerId: string, page: number) => {
  const totalOrders = await prisma.orders.count({
    where: {
      providerId,
    },
  });
  const totalPages = Math.ceil(totalOrders / 15);
  const result = await prisma.orders.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
    skip: (page - 1) * 15,
    where: {
      providerId,
    },
    select: {
      id: true,
      mealId: true,
      userId: true,
      quantity: true,
      totalPrice: true,
      status: true,
      createdAt: true,
      meal: {
        select: {
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });
  return {
    result,
    totalPages,
  };
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const result = await prisma.orders.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  return result;
};

export const orderServices = {
  createOrder,
  getOrders,
  getProviderOrders,
  updateOrderStatus,
};
