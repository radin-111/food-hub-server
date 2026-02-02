import { type Request, type Response } from "express";
import { userServices } from "./Users.services";
const getAllUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const result = await userServices.getAllUsers(page);
  try {
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
      
      
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const userControllers = {
  getAllUsers,
};
