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
const updateProviderProfiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const providerProfile = req.body;
  const result = await providerProfilesServices.updateProviderProfiles(id as string, providerProfile);
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
  
export const ProviderProfilesController = {
  createProviderProfiles,
  
  updateProviderProfiles,
  
}
