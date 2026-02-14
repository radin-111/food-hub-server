import { type Request, type Response } from "express";
import { userServices } from "./User.services";

const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await userServices.getUserProfile(userId as string);
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role;
  try {
    const result = await userServices.updateUserProfile(
      userId as string,
      req.body,
      role as string,
    );
    res.status(200).json({
      success: true,
      message: "User profile updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};


export const userController = {
  getUserProfile,
  updateUserProfile,
};
