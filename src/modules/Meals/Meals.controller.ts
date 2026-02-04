import { Meals } from "../../generated/prisma/client";
import { MealsServices } from "./Meals.services";

import { type Request, type Response } from "express";

const createMeals = async (req: Request, res: Response) => {

    
  const meal   = req.body;
  try {
    const result = await MealsServices.createMeals(meal);
    res.status(201).json({
      success: true,
      message: "Meals created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

const updateMeals = async (req: Request, res: Response) => {
  const { id } = req.params;
  const meal = req.body;
  try {
    const result = await MealsServices.updateMeals(id as string, meal);
    res.status(201).json({
      success: true,
      message: "Meals updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

const deleteMeals = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await MealsServices.deleteMeals(id as string);
    res.status(201).json({
      success: true,
      message: "Meals deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const result = await MealsServices.getAllMeals();
    res.status(201).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await MealsServices.getAllCategories();
    res.status(201).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

const createCategories = async (req: Request, res: Response) => {
  const category = req.body;
  
  try {
    const result = await MealsServices.createCategories(category);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
}

export const MealsController = {
  createMeals,
  createCategories,
  getAllCategories,
  updateMeals,
  deleteMeals,
  getAllMeals,
}