import { type Request, type Response } from "express";
import { orderServices } from "./Orders.services";
import { OrderStatus } from "../../generated/prisma/enums";

const createOrder = async (req: Request, res: Response) => {
  const order = req.body;
  const userId = req.user?.id as string;
  try {
    const result = await orderServices.createOrder(order, userId);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create order",
      error: error,
    });
  }
};
const getOrders = async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const page = Number(req.query.page) || 1;
  try {
    const result = await orderServices.getOrders(userId, page);
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve orders",
      error: error,
    });
  }
};
const getProviderOrders = async (req: Request, res: Response) => {
  const providerId = req.user?.providerId as string;
  const page = Number(req.query.page) || 1;
  try {
    const result = await orderServices.getProviderOrders(providerId, page);
    res.status(200).json({
      success: true,
      message: "Provider orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve provider orders",
      error: error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;
  
  try {
    const result = await orderServices.updateOrderStatus(
      orderId as string,
      status as OrderStatus,
      req.user?.role as string,
      req.user?.id as string,
    );
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to update order status",
        error: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order status",
      error: error,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  try {
    const result = await orderServices.getAllOrders(page);
    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve all orders",
      error: error,
    });
  }
};
export const orderControllers = {
  createOrder,
  getOrders,
  getProviderOrders,
  updateOrderStatus,
  getAllOrders,
};
