import { type Request, type Response } from "express";
import { reviewServices } from "./Reviews.services";

const submitReview = async (req: Request, res: Response) => {
  try {
    
    const userId = req.user?.id;
    const { orderId ,mealId,rating,comment } = req.body;
    const review = await reviewServices.submitReview({
      userId,
      orderId,
      mealId,
      rating,
      comment,
    });
    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: "Failed to submit review",
      error: error.message,
    });
  }
};
const getRecentReviews = async (req: Request, res: Response) => {
  try {
   
    const reviews = await reviewServices.getRecentReviews();
    res.status(200).json({
      success: true,
      message: "Received reviews retrieved successfully",
      data: reviews,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve received reviews",
      error: error.message,
    });
  }
};



export const reviewControllers={
  submitReview,
  getRecentReviews,
}
