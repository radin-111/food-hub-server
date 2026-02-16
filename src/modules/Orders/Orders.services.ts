import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UserRoles } from "../../middlewares/auth";

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
      reviews: {
        select: {
          rating: true,
          comment: true,
        },
      },
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
      reviews: {
        select: {
          rating: true,
          comment: true,
        },
      },
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

const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  role: string,
  userId: string,
) => {
  if (role === UserRoles.CUSTOMER && status !== OrderStatus.CANCELLED) {
    return null;
  }
  if (role === UserRoles.PROVIDER && status === OrderStatus.CANCELLED) {
    return null;
  }
  const order = await prisma.orders.findUnique({
    where: {
      id: orderId,
    },
  });
  if (order?.userId !== userId && role !== UserRoles.PROVIDER) {
    return null;
  }

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
const getAllOrders = async (page: number) => {
  const totalOrders = await prisma.orders.count();
  const totalPages = Math.ceil(totalOrders / 15);
  const result = await prisma.orders.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
    skip: (page - 1) * 15,
    select: {
      id: true,
      mealId: true,
      userId: true,
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
export const orderServices = {
  createOrder,
  getOrders,
  getAllOrders,
  getProviderOrders,
  updateOrderStatus,
};
