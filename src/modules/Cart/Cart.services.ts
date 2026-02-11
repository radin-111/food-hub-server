import { prisma } from "../../lib/prisma";

const addToCart = async (cartItem: any) => {
  const result = await prisma.cart.create({
    data: cartItem,
  });
  return result;
};
const getCartItems = async (userId: any, page: number) => {
  const totalPages = Math.ceil(
    (await prisma.cart.count({
      where: {
        userId,
      },
    })) / 15,
  );
  const result = await prisma.cart.findMany({
    take: 15,
    skip: (page - 1) * 15,
    where: {
      userId,
    },
    select: {
      id: true,
      mealId: true,
      providerId: true,
      meal: {
        select: {
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });
  return { result, totalPages };
};
const removeFromCart = async (cartItemId: any) => {
  const result = await prisma.cart.delete({
    where: {
      id: cartItemId,
    },
  });
  return result;
};

const clearCart = async (userId: any) => {
  const result = await prisma.cart.deleteMany({
    where: {
      userId,
    },
  });
  return result;
};

export const cartServices = {
  addToCart,
  getCartItems,
  removeFromCart,

  clearCart,
};
