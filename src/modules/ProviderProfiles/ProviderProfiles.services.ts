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
const createMeals = async (data: Meals) => {
  const result = await prisma.meals.create({
    data,
  });
  return result;
};
const updateMeals = async (id: string, data: Meals) => {
  const result = await prisma.meals.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteMeals = async (id: string) => {
  const result = await prisma.meals.delete({
    where: {
      id,
    },
  });
  return result;
};
export const providerProfilesServices = {
  createProviderProfiles,
  createMeals,
  updateMeals,
  deleteMeals,
};
