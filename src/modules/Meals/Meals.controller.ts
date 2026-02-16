
import { MealsServices } from "./Meals.services";

import { type Request, type Response } from "express";

const createMeals = async (req: Request, res: Response) => {
  const meal = req.body;
  const providerId = req.user?.providerId as string;

  try {
    const result = await MealsServices.createMeals(meal, providerId);
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
};

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
};

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
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const search = req.query.search as string;
    const result = await MealsServices.getAllMeals(page,search);  
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
};

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
};

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
};

const updateCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = req.body;
  try {
    const result = await MealsServices.updateCategories(id as string, category);
    res.status(201).json({
      success: true,
      message: "Category updated successfully",
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



const getMealsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await MealsServices.getMealsById(id as string);
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
};

const getMyMeals = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const providerId = req.user?.providerId as string;
  try {
    const result = await MealsServices.getMyMeals(providerId,page);
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
};

export const MealsController = {
  createMeals,
  createCategories,
  getAllCategories,
  getMealsById,
  updateMeals,
  deleteMeals,
  getMyMeals,
  updateCategories,
  getAllMeals,
};
