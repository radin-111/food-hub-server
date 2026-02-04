import { type Request, type Response } from "express";
import { providerProfilesServices } from "./ProviderProfiles.services";
const getAllProviderProfiles = async (req: Request, res: Response) => {
  const { page  } = req.query;

  const result = await providerProfilesServices.getAllProviderProfiles(Number(page) || 1);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profiles retrieved successfully",
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

const getProviderProfilesRequest = async (req: Request, res: Response) => {
  const { page } = req.query;
  const result = await providerProfilesServices.getProviderProfilesRequest(Number(page) || 1);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profiles request retrieved successfully",
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







const createProviderProfiles = async (req: Request, res: Response) => {
  const providerProfile = req.body;

  const result =await providerProfilesServices.createProviderProfiles(providerProfile, req?.user?.id as string);
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
const updateProviderProfiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const providerProfile = req.body;
  const result = await providerProfilesServices.updateProviderProfiles(id as string, providerProfile, req?.user?.id as string);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile updated successfully",
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
const updateProviderProfilesRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const providerProfile = req.body;
  const result = await providerProfilesServices.updateProviderProfilesRequest(id as string, providerProfile);
  try {
    res.status(201).json({
      success: true,
      message: "Provider profile request updated successfully",
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
  getAllProviderProfiles,
  updateProviderProfilesRequest,
  updateProviderProfiles,
  getProviderProfilesRequest,
}
