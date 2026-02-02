import { Meals, ProviderProfiles } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProviderProfiles = async (
  profileData: Omit<
    ProviderProfiles,
    "id" | "createdAt" | "updatedAt" 
  >,
) => {
  const result = await prisma.providerProfiles.create({
    data: {
      ...profileData,
      userId: profileData.userId,
    },
  });
  return result;
};


const updateProviderProfiles = async (id: string, data: ProviderProfiles) => {
  const result = await prisma.providerProfiles.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
export const providerProfilesServices = {
  createProviderProfiles,
  
  updateProviderProfiles,
  
};
