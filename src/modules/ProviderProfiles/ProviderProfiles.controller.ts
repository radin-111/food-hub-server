import { type Request, type Response } from "express";
import { providerProfilesServices } from "./ProviderProfiles.services";
const createProviderProfiles = async (req: Request, res: Response) => {
  const providerProfile = req.body;
  
  const result =await providerProfilesServices.createProviderProfiles(providerProfile);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
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
const createMeals = async (req: Request, res: Response) => {
  const meals = req.body;
  const result = await providerProfilesServices.createMeals(meals);
  try {
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
  const meals = req.body;
  const result = await providerProfilesServices.updateMeals(id as string, meals);
  try {
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
  const result = await providerProfilesServices.deleteMeals(id as string);
  try {
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
  
export const ProviderProfilesController = {
  createProviderProfiles,
  createMeals,
  updateMeals,
  deleteMeals
};
