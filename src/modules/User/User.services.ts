import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UserRoles } from "../../middlewares/auth";

const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      providerProfiles: true,
    },
  });

  return user;
};
const updateUserProfile = async (
  userId: string,
  userData: any,
  role: string,
) => {
  if (role === UserRoles.PROVIDER) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: userData.name,
        image: userData.image,
        phone: userData.phone,
        providerProfiles: {
          update: {
            restaurantName: userData.providerProfiles.restaurantName,
            address: userData.providerProfiles.address,
            city: userData.providerProfiles.city,
            country: userData.providerProfiles.country,
            postalCode: userData.providerProfiles.postalCode,
            phoneNumber: userData.providerProfiles.phoneNumber,
            website: userData.providerProfiles.website,
            description: userData.providerProfiles.description,
          },
        },
      },
    });
    return user;
  } else {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: userData.image,
        name: userData.name,
        phone: userData.phone,
      },
    });
    return user;
  }
};

export const getCustomerStatistics = async (userId: string) => {
  const [
    revenue,
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalReviews,
    recentOrders,
  ] = await prisma.$transaction([
    prisma.orders.aggregate({
      where: { userId },
      _sum: { totalPrice: true },
    }),

    prisma.orders.count({
      where: { userId },
    }),

    prisma.orders.count({
      where: { userId, status: OrderStatus.DELIVERED },
    }),

    prisma.orders.count({
      where: { userId, status: OrderStatus.CANCELLED },
    }),

    prisma.reviews.count({
      where: { userId },
    }),

    prisma.orders.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        meal: true,
        provider: true,
      },
    }),
  ]);

  return {
    totalSpent: revenue._sum.totalPrice ?? 0,
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalReviews,
    recentOrders,
  };
};

const getProviderStatistics = async (providerId: string) => {
  const [
    revenue,
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalMeals,
    totalReviews,
    averageRating,
    recentOrders,
  ] = await prisma.$transaction([
    prisma.orders.aggregate({
      where: { providerId },
      _sum: { totalPrice: true },
    }),

    prisma.orders.count({
      where: { providerId },
    }),

    prisma.orders.count({
      where: { providerId, status: OrderStatus.DELIVERED },
    }),

    prisma.orders.count({
      where: { providerId, status: OrderStatus.CANCELLED },
    }),

    prisma.meals.count({
      where: { providerId },
    }),

    prisma.reviews.count({
      where: { providerProfilesId: providerId },
    }),

    prisma.reviews.aggregate({
      where: { providerProfilesId: providerId },
      _avg: { rating: true },
    }),

    prisma.orders.findMany({
      where: { providerId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        meal: true,
        user: true,
      },
    }),
  ]);

  return {
    totalRevenue: revenue._sum.totalPrice ?? 0,
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalMeals,
    totalReviews,
    averageRating: averageRating._avg.rating ?? 0,
    recentOrders,
  };
};

const getAdminStatistics = async () => {
  const [
    revenue,
    totalOrders,
    deliveredOrders,
    cancelledOrders,
    totalUsers,
    totalProviders,
    totalMeals,
    totalReviews,
    monthlyRevenue,
    recentOrders,
  ] = await prisma.$transaction([
    prisma.orders.aggregate({
      _sum: { totalPrice: true },
    }),

    prisma.orders.count(),

    prisma.orders.count({
      where: { status: OrderStatus.DELIVERED },
    }),

    prisma.orders.count({
      where: { status: OrderStatus.CANCELLED },
    }),

    prisma.user.count(),

    prisma.providerProfiles.count(),

    prisma.meals.count(),

    prisma.reviews.count(),

    prisma.orders.groupBy({
      by: ["createdAt"],
      _sum: { totalPrice: true },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),

    prisma.orders.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        meal: true,
        user: true,
        provider: true,
      },
    }),
  ]);

  return {
    totalRevenue: revenue._sum.totalPrice ?? 0,
    totalOrders,
    deliveredOrders,
    cancelledOrders,
    totalUsers,
    totalProviders,
    totalMeals,
    totalReviews,
    monthlyRevenue,
    recentOrders,
  };
};

export const userServices = {
  getUserProfile,
  updateUserProfile,
  getCustomerStatistics,
  getProviderStatistics,
  getAdminStatistics,
};
