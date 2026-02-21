import { prisma } from "../../lib/prisma";

const submitReview = async (payload: any) => {
  const review = await prisma.reviews.create({
    data: {
      userId: payload.userId,
      orderId: payload.orderId,
      mealId: payload.mealId,
      rating: payload.rating,
      comment: payload.comment,
      providerId: payload.providerId,
    },
  });
  return review;
};
const getRecentReviews = async () => {
  const reviews = await prisma.reviews.findMany({
    take: 9,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const reviewServices = {
  submitReview,
  getRecentReviews,
};
