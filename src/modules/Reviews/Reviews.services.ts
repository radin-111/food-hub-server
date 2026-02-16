import { prisma } from "../../lib/prisma";

const submitReview = async (payload: any) => {
  const review = await prisma.reviews.create({
    data: {
      userId: payload.userId,
      orderId: payload.orderId,
      mealId: payload.mealId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
  return review;
};

export const reviewServices = {
  submitReview,
};
